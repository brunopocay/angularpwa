export function FormatarDataParaString(dataString: string): string {
    // Convertendo a string para objeto Date
    const data = new Date(dataString);
    
    // Verificando se a conversão foi bem sucedida
    if (isNaN(data.getTime())) {
      return dataString;
    }
    
    // Convertendo a data para o formato desejado
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    let dataAjustada = new Date(data);
    dataAjustada.setMinutes(dataAjustada.getMinutes() + dataAjustada.getTimezoneOffset());
    
    return dataAjustada.toLocaleDateString('pt-BR', options);
}

export function FormatNativeDate(data: Date): string {
  const ano = data.getFullYear();
  const mes = ('0' + (data.getMonth() + 1)).slice(-2);
  const dia = ('0' + data.getDate()).slice(-2);
  return `${ano}-${mes}-${dia}`;
}

//função realizada para setar a datamaxima que pode ser escolhida para 30 dias.
export function addDaysToDate(dataMinima: string, quantidadeDiasMaxDate: number): string {
  if (dataMinima) {
      const dataMinDate = new Date(dataMinima);

      // Verifica se a dataMinDate é uma data válida
      if (isNaN(dataMinDate.getTime())) {
          console.error('Data mínima inválida:', dataMinima);
          return ''; // Retorna uma string vazia se a data for inválida
      }

      const dataMaxDate = new Date(dataMinDate.getTime() + (quantidadeDiasMaxDate * 24 * 60 * 60 * 1000));

      // Verifica se a dataMaxDate é uma data válida
      if (isNaN(dataMaxDate.getTime())) {
          console.error('Data máxima inválida:', dataMaxDate);
          return ''; // Retorna uma string vazia se a data for inválida
      }

      return FormatNativeDate(dataMaxDate);
  }
  return '';
}

