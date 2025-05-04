import { CapitalCuo, FRC, IntCuo, monInt, MonSegDM, montCap, TSegDD } from "./Formulas"
import { compareAsc, format,add,formatDistance, differenceInDays,getDate,isFuture} from 'date-fns'

//? ************************ TODO ESTAS FUNCIONES SON APLICABLES PARA UNA FINANCIERA ************************
//TODO --> CRONOGRAMA DE LA FECHA
// Esta función solo calcula la fecha mensual, no se utilizará, pero se dejará para analizar su lógica
export const sumarMes = (data,i)=>{

    let fechaPago =""
    let [anio, mes, dia] = data.fechaPrimeraCuota.split('-')
    let nuevoAnio =""
    let parseMes = parseInt(mes)+i

    if(parseMes<=12) fechaPago=`${anio}-${parseMes.toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}`

    else  {
        
        let nuevoMes = parseInt(mes)+i

        if(nuevoMes % 12 === 0){
             nuevoAnio =parseInt(anio) + (nuevoMes/12 - 1)
        }

         if(nuevoMes % 12 !== 0){
             nuevoAnio = parseInt(anio)+(Math.trunc(nuevoMes/12))
         }

        mes=(parseInt(mes)+i)-(12*(nuevoMes % 12 ===0 ? (nuevoMes/12)-1 : Math.trunc(nuevoMes/12)))

        fechaPago=`${nuevoAnio}-${mes.toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}` 
    }
    return fechaPago   
}
 // Esta función es la que se utilizará para el cálculo de las fechas de acuerdo al tipo de periodo
export const paymentDate = (data, value)=>{

    // Agregamos un dia a la decha de la primera cuota, porque por defecto del metododo "new Date" sale con un dia anterior a la fecha seleccionado
    const date = add(new Date(data.fechaPrimeraCuota), {
        days:1
      });

    let constante =1
    let time=''

    switch (data?.periodo){
        case 'Mensual':
            time='months'
            break
        case 'Quincenal':
            constante=15
            time='days'
            break
        case 'Semanal':
            time='weeks'
            break
        case 'Diario':
            time='days'
            break
        default:
            constante
    }

    // Cronograma de las fechas de acuerdo al periodo
    const newDate = add(new Date(date), {
        [time]: constante*value
      });
      
      return format(newDate,'yyyy-MM-dd')
}

//TODO --> DIAS POR MES
export const diasXmes = (data,i)=>{
    let NDias = ""

    if (i===0){
        let fechaInicio = new Date(data.fechaDesembolso).getTime();
        let fechaFin    = new Date(data.fechaPrimeraCuota).getTime();
        let diff = fechaFin - fechaInicio;
        const resultDA = diff/(1000*60*60*24)
        NDias = resultDA
    }
    else{
        const resultDateIni = paymentDate(data,i-1)
        const resultDateFin = paymentDate(data,i)

        let [anioI,mesI,diaI] = resultDateIni.split('-')
        let [anioF,mesF,diaF ] = resultDateFin.split('-')

        let fechaInicio   = new Date(`${anioI}-${mesI}-${diaI}`).getTime();
        let fechaFin   = new Date(`${anioF}-${mesF}-${diaF}`).getTime();
        let result = (fechaFin-fechaInicio)/(1000*60*60*24)
        NDias = result

    }

    return NDias
}

//TODO --> DIAS ACUMULADOS
export const diasAcum = (data,i)=>{
    let acum = 0
    let fechaInicio = new Date(data.fechaDesembolso).getTime();
    let fechaFin    = new Date(data.fechaPrimeraCuota).getTime();

    if (i===0){
        let diff = fechaFin - fechaInicio;
        acum = diff/(1000*60*60*24)
    }
    else{

        const resultDateFin = paymentDate(data,i)
        let [ anioF,mesF,diaF ] = resultDateFin.split('-')

        let fechaFin   = new Date(`${anioF}-${mesF}-${diaF}`).getTime();
        let result = (fechaFin-fechaInicio)/(1000*60*60*24)
        acum = result
    }
    return acum

}

//TODO --> FRC 
export const solutionFRC = (ted,data,i,acumFRCA)=>{
    let resultDiasAcum = diasAcum(data,i-1)
     let result = FRC(ted,resultDiasAcum)
     acumFRCA.push(parseFloat(result))
    
     return result

}


//TODO --> CUOTA INTERES Y CAPITAL
export const CuotInt = (data,i,tem,periodo,resultFRCA,newCapital,TSegM)=>{

    let resultDiasMes = diasXmes(data,i)
    let CAPITAL = parseFloat(data.capital)
    let resultTSegDD = TSegDD(TSegM)
    let resultCapital
    let resultCuoInt
    let resultCuoCap
    let resultMonSegDesg
    let CuoSinITF
    let RITF
    let CuoConITF

    if(i === 0){

         // Cuota interes
         resultCuoInt = IntCuo(tem,periodo,resultDiasMes,CAPITAL)
         
         // Cuota capital
         resultCuoCap =  CapitalCuo(CAPITAL,resultFRCA,resultCuoInt)
         
         //Capital restante
         resultCapital = CAPITAL-resultCuoCap
         newCapital.push(resultCapital)

        // Cálculo de la tasa de seguro de desgravamen diario
       
        resultMonSegDesg = MonSegDM(resultTSegDD,CAPITAL,resultDiasMes)
        
        // Cálculo de la cuota sin ITF
       
        CuoSinITF = resultCuoInt + resultCuoCap + resultMonSegDesg

        // Cálculo de ITF
        let ITF = CuoSinITF*0.00005
        RITF = Number.parseFloat(ITF).toFixed(3)

        // Cálculo de la cuota con ITF
        CuoConITF = parseFloat(CuoSinITF) + parseFloat(RITF)
      
    }
    else{

        // Cálculo de la tasa de seguro de desgravamen diario
        resultMonSegDesg = MonSegDM(resultTSegDD,newCapital[0],resultDiasMes)

        // Cuota interes
        resultCuoInt = IntCuo(tem,periodo,resultDiasMes,newCapital[0])
        
        // Cuota capital
        resultCuoCap =  CapitalCuo(CAPITAL,resultFRCA,resultCuoInt)
        
        // Cálculo de la cuota sin ITF
        CuoSinITF = resultCuoInt + resultCuoCap + resultMonSegDesg
        //CuotasT.push(CuoSinITF)

        // Cálculo de ITF
        let ITF = CuoSinITF*0.00005
        RITF = Number.parseFloat(ITF).toFixed(3)

        // Cálculo de la cuota con ITF
        CuoConITF = parseFloat(CuoSinITF) + parseFloat(RITF)
        //CuotasT.push(CuoConITF)
        
        //Capital restante
        resultCapital = (newCapital[0])-resultCuoCap
        resultCapital = Number.parseFloat(resultCapital).toFixed(10)
        newCapital.shift()
        newCapital.push(resultCapital)
 
    }

    return {
        resultInt:resultCuoInt,
        resultCuo: resultCuoCap,
        resultCap:resultCapital,
        resultSeg:resultMonSegDesg,
        resultCuoSinITF:CuoSinITF,
        resultCuoConITF:CuoConITF
    }
}


//TODO --> CÁLCULO DE LA MORA 
//! ESTE COMENTARIO SE BORRARA, ES PARA RECORDAR QUE SE DEBE DE CREAR UNA NUEVA FUNCION PARA CALCULAR LA MORA
export const calculoMora = (data, dataConfiguration)=>{

    let intMoratorio =parseFloat(dataConfiguration?.intMoratorio)  // % --> Diario
    
    let ccv = parseFloat(dataConfiguration?.ccv) // % (Comisión de Cobranza Variable) --> Se aplica al monto de la cuota

    // % de interes moratorio diario
     intMoratorio = (Math.pow(1 +intMoratorio / 100, 1 / 360) - 1) * 100;

    // Cálculo de los dias de mora
    let today = format(new Date(),"yyyy-MM-dd")
     let fechaInicio = new Date(today).getTime()
     let fechaFin = new Date(data?.fechaPago).getTime()

     let diff = fechaInicio-fechaFin ;
        diff = diff/(1000*60*60*24)

    // Cálculo del interes
    let int = (intMoratorio*data?.capital*diff)/100

    // Cálculo de la comisión de cobranza variable
    ccv = (ccv*data?.montoCuota)/100

     // Cálculo de ITF
     let itf =0.00005*data?.capital

     // Cálculo de la cuota neto a pagar
     let result = parseFloat(data?.montoCuota) +  parseFloat(int) + parseFloat(ccv) + parseFloat(itf)
     
     return result.toFixed(2)

}


//? ***************************************************************************************************

//? --------------------- ESTA FUNCIÓN ES APLICABLE CON UN PRÉSTAMO INDEPENDIENTE ---------------------

//TODO -->CRONOGRAMA DE PAGO PARA UN PRÉSTAMO INDEPENDIENTE (INTERES SIMPLE)
// Cálculo de la cuota
export const calculoCuota = (data,i)=>{
    let cuota

    if(data?.tipoPago == "Interes"){
        
        if(data?.cuotas != i) cuota = data?.capital*data?.interes/100
        if (data?.cuotas == i) cuota = parseFloat(data?.capital*data?.interes/100)+parseFloat(data?.capital)

    }
    if (data?.tipoPago == "Fraccionado"){
        cuota = (parseFloat(data?.capital*data?.interes/100)*(parseInt(data?.cuotas)) + parseFloat(data?.capital))/parseInt(data?.cuotas)
    }
    return cuota
}
// Cálculo de la cuota interés, la cuota capital y el saldo capital
export const cuotInterSimple =(capital,interes,tiempo,i,newCapital,cuotas)=>{
    let resultCapital
    let resultCuoInt
    let resultCuoCap
    
    if(i === 0){

         // Cuota interes
         resultCuoInt = monInt(capital,interes,tiempo)
         
         // Cuota capital
         resultCuoCap =  montCap(capital,tiempo)
         
         //Capital restante
         resultCapital = capital-resultCuoCap
         newCapital.push(resultCapital)
      
    }
    else{
        

        // Cuota interes
        resultCuoInt = monInt(capital,interes,tiempo)
        
        // Cuota capital
        resultCuoCap =  montCap(capital,tiempo)
        
        //Capital restante
        resultCapital = (newCapital[0])-resultCuoCap
        resultCapital = Number.parseFloat(resultCapital).toFixed(2)
        newCapital.shift()
        newCapital.push(resultCapital)
 
    }


    return {
        resultInt:parseFloat(resultCuoInt).toFixed(2),
        resultCuo: parseFloat(resultCuoCap).toFixed(2),
        resultCap:parseFloat(resultCapital).toFixed(2),
        resultCuoNeto: (parseFloat(resultCuoInt)+parseFloat(resultCuoCap)).toFixed(2)
    }
}

export const calculoMoraSimple = (data, dataConfiguration)=>{

    let intMoratorio =parseFloat(dataConfiguration?.intMoratorio)/100  // % --> Diario
    intMoratorio = intMoratorio == 0 ? 0.00000001 :intMoratorio
    let mora
    
    // Cálculo de los dias de mora
    
    let toDay = format(new Date(),"yyyy-MM-dd")
     let fechaInicio = new Date(toDay).getTime()
     let fechaFin = new Date(data?.fechaPago).getTime()
     let diff = fechaInicio-fechaFin ;
        diff = diff/(1000*60*60*24)

    // Cálculo del interes
    if(diff > 0){ mora = (intMoratorio*data?.capital*diff)/100}
    else{mora=data?.mora}
     
     return mora

}

export const calculoCanlelarDeuda =(resultPrestamo ,dataConfiguration,interes)=>{
    
    // Calculamos la mora para cada cuota
    let moraData = resultPrestamo.map(element=>{  
        let montoMora = element?.mora
        if (!element?.statusPay){ //! EN OBSERVACION: verifica cuando la primera cuota se haya pagado dentro del plazo y la segunda este en mora, en la primera la mora debe ser 0 en la segunda si debe marcar la mora correspondiente, despues borrar este comentario
            montoMora = calculoMoraSimple(element,dataConfiguration)
        }
        return {...element,mora:montoMora}
    })

    let cuotaMora = moraData.filter(element=>element?.statusPay == false) // filtramos las cuotas pagadas de las pendientes
    
     // suma total de las cuotas que estan en mora
     let cuotasPendientesMora = cuotaMora.filter(element=>element?.mora!=0)

     let montoPendienteMora = cuotasPendientesMora?.length * (cuotasPendientesMora?.length == 0 ? 0 :cuotasPendientesMora[0]?.cuotaNeto) // antes de la operación evalua si existen cuaotas pendientes


    // suma total de la mora
    const initialValue = 0;
    let moraTotal = cuotaMora.map(element=> element?.mora) // combierte todas la moras en un array
    
    moraTotal = moraTotal.reduce((accumulator, currentValue) => accumulator + currentValue,initialValue); // suma todas las moras


    // interes generado hasta la fecha de pago
    let cuotaPendiente = cuotaMora.find(element =>element?.mora == 0) // la data que se encuentra dentro del plazo de pago

        // cálculo de los dias de diferencia

        const fechaModificada = new Date(cuotaPendiente?.fechaPago); // hacemos una copia

        fechaModificada.setMonth(fechaModificada.getMonth() - 1);

        const diasPendientes = differenceInDays(new Date(),fechaModificada) // diferencia de los dias pendientes      
          
    let interesGenerado = (parseFloat(cuotaPendiente?.saldoCapital)+ parseFloat(cuotaPendiente?.cuotaCapital))*diasPendientes*interes/(100*30) // formula : I = capital*dias*interes diario
        
        interesGenerado = interesGenerado < 0 ? 0 : interesGenerado // Si el interes generado es negativo se considerará cero debido a la anterioridad de la fecha de vencimiento
    
    // monto de la deuda a cancelar
    let capitalPendiente = (parseFloat(cuotaPendiente?.saldoCapital)+ parseFloat(cuotaPendiente?.cuotaCapital))

    let montoCancelar = capitalPendiente + moraTotal + montoPendienteMora + interesGenerado
    

    return {capitalMora : montoPendienteMora.toFixed(2),
        mora :moraTotal.toFixed(2),
        interes : interesGenerado.toFixed(2),
        capitalPendiente:capitalPendiente.toFixed(2),
        montoTotal : montoCancelar.toFixed(2)}
}