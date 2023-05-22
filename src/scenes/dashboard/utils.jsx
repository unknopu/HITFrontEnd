import axios from 'axios';

export function myrisk(test) {
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


export function mapTransaction(sqli, lfi, missConfig, xss, outeddateComponents, cryptoFailure) {
    var Transactions = []

    for (let i = 0; i < sqli.length; i++) {
        Transactions.push({
            txId: sqli[i].id,
            type: sqli[i].type,
            vulnerability: sqli[i].vaulnerability,
            level: sqli[i].level,
        })
    } 
    for (let i = 0; i < lfi.length; i++) {
        Transactions.push({
            txId: lfi[i].id,
            type: lfi[i].type,
            vulnerability: lfi[i].vaulnerability,
            level: lfi[i].level,
        })
    } 
    for (let i = 0; i < missConfig.length; i++) {
        Transactions.push({
            txId: missConfig[i].id,
            type: missConfig[i].type,
            vulnerability: missConfig[i].vaulnerability,
            level: missConfig[i].level,
        })
    } 
    for (let i = 0; i < xss.length; i++) {
        Transactions.push({
            txId: xss[i].id,
            type: xss[i].type,
            vulnerability: xss[i].vaulnerability,
            level: xss[i].level,
        })
    } 
    for (let i = 0; i < outeddateComponents.length; i++) {
        Transactions.push({
            txId: outeddateComponents[i].id,
            type: outeddateComponents[i].type,
            vulnerability: outeddateComponents[i].vaulnerability,
            level: outeddateComponents[i].level,
        })
    } 
    for (let i = 0; i < cryptoFailure.length; i++) {
        Transactions.push({
            txId: cryptoFailure[i].id,
            type: cryptoFailure[i].type,
            vulnerability: cryptoFailure[i].vaulnerability,
            level: cryptoFailure[i].level,
        })
    } 

    const sortList = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
    var sortedObj = Transactions.sort((a, b) => {
        return (
            sortList.indexOf(a.level) - sortList.indexOf(b.level)
        );
    });
    return sortedObj;
}