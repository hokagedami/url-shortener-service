if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}



const disableResultView = () => {
    let result = document.getElementById('result')
    if (result) {
        result.style.display = 'none'
    }
}