
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})




function alertS(mes) {
    Toast.fire({
        icon: 'success',
        title: mes
    })

}


function alertE(mes) {
    Toast.fire({
        icon: 'error',
        title: mes
    })

}

export { alertS, alertE }
