




function quickSort(arr) {
    if(arr.length <= 1) return arr
    const midIndex = Math.floor(arr.length / 2)
    var midItem = arr.splice(midIndex, 1)[0];
    const left =[], right=[];
    for (var i = 0; i < arr.length; i++){
        if(arr[i] < midItem) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return [... quickSort(left), midItem, ...quickSort(right)]
}

const list = [2,89,17,97,56,46,87,67,65,43,102,18]

console.log('qu :>> ', quickSort(list));