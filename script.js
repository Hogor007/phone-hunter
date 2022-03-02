//Update the innerHtml
const toDoData = data => {
    displayLoading()
    //Making an array of all the data
    const arrayOfData = data.data.map(e => {
        return e;
    })
    //Getting the first 20 elements of the array
    const zeroToTwenty = arrayOfData.slice(0, 20);
    //Shows 20 phones as default
    showTotalData(zeroToTwenty);
    hideLoading()
}