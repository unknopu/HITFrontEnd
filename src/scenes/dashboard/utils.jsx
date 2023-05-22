import axios from 'axios';

export function myrisk(test) {
    console.log(test)
    return 1-(test/100)
}
export function mylevel(colors, test) {
    if (test == "CRITICAL"){
        return colors.redAccent[500]
    } 
    if (test == "HIHG"){
        return colors.redAccent[900]
    } 
    if (test == "MEDIUM"){
        return colors.redAccent[1000]
    } 
    if (test == "LOW"){
        return colors.greenAccent[600]
    } 
    return colors.primary[900]
};

export function myrisklevel(value) {
    console.log(value)
    if (value >= 0.8) {
        return "CRITICAL"
    }
    if (value >= 0.7) {
        return "HIHG"
    }
    if (value >= 0.4) {
        return "MEDIUM"
    }
    if (value >= 0.3) {
        return "LOW"
    }
    return "INFORMATION"+value
}

var getReport = "helmtail.tech/api/v1/report/latest"
export function getLatestReport() {
    axios.get(getReport)
        .then((res) => {
            window.location.reload(true);
        }).catch((error) => {
            window.location.reload(false);
        });
}
