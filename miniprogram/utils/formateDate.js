function formateDate(date){
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  const o = {
    'y+': date.getFullYear(),
    'M+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'h+': date.getHours().toString(),
    'm+': date.getMinutes().toString(),
    's+': date.getSeconds().toString(),
  }
  for(let i in o){
    if(new RegExp('('+i+')').test(fmt)){
      fmt = fmt.replace(RegExp.$1, o[i].length===1?0+o[i]:o[i])
    }
  }
  return fmt
}
export default formateDate