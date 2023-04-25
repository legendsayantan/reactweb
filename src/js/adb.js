/* eslint-disable */
import Adb from './webadb'

var adbInstance = null, device = null, webusb = null;
var connectBtn, nameView, container;
var AdbModes = {
    connect: 0,
    loadApps: 1,
    execute: 2,
    disconnect: 3,
}
export let getAdbModes = () => {
    return AdbModes
}

async function doViaAdb(action, callback = (e, result) => {
}, data) {
    switch (action) {
        case AdbModes.connect:
            await usbConnection(callback);
            break;
        case AdbModes.loadApps:
            let packages = await getPackages()
            if (packages.length > 0) callback(0, packages)
            else callback(-1)
            break
        case AdbModes.execute:
            let result = await executeForResult(data)
            if (result.length > 0) callback(0, result)
            else callback(-1)
            break
        case AdbModes.disconnect:
            await disconnect()
            callback(0)
    }
}

export default doViaAdb;

async function usbConnection(callback = (e, result) => {
}) {
    try {
        webusb = await Adb.open("WebUSB");
    } catch (error) {
    }
    if (webusb == null) {
        console.error('webusb is null')
        callback(-1, '');
    } else {
        await askForAdb((e) => {
            if (e === 0) adbConnection((code) => {
                callback(code, '')
            });
            else callback(-1, '')
        });
    }
}

async function askForAdb(callback = (e) => {
}) {
    let code = 0;
    try {
        adbInstance = await webusb.connectAdb("host::");
        callback(0);
    } catch (error) {
        console.log(error);
        if (error.message.includes("Failed to connect with")) {
            await askForAdb(callback);
        } else if (error.message.includes("Unable to claim interface")) {
            code = 2;
        } else code = 3;
        callback(code)
    }
}

async function adbConnection(callback = (e) => {
}) {
    console.log("checking adb connection");
    if (adbInstance == null) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await adbConnection(callback);
    } else {
        device = await adbInstance.transport.device;
        console.log(device)
        callback(0);
    }
}

async function executeForResult(data) {
    let shell = await adbInstance.shell(data.replace("\n", ";"));
    console.log("execution ready");
    let response = await shell.receive();
    let str;
    try {
        let decoder = new TextDecoder("utf-8");
        str = decoder.decode(response.data);
    } catch (error) {
        str = response;
    }
    return str;
}

async function disconnect() {
    webusb = null;
    adbInstance = null;
    try {
        device.close();
    } catch (error) {
    }
}

async function getPackages() {
    if (webusb && adbInstance) return await executeForResult("pm list packages | awk -F ':' '{print $2}' | xargs echo");
    else return '';
}

async function checkConnection() {
    console.log(webusb != null ? "webusb ok" : "webusb null");
    console.log(adbInstance != null ? "adb ok" : "adb null");
    return (webusb != null && adbInstance != null);
}

async function fetchAppInfo(callback) {
    await fetch('https://rawcdn.githack.com/0x192/universal-android-debloater/749820ca8616df97b81a2b51e0422f3ae7cd593c/resources/assets/uad_lists.json').then(async function (response) {
        return await response.text();
    })
        .then(async function (body) {
            callback(body)
        });
}