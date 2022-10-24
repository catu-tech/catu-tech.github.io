


document
.getElementById("selectPort")
.addEventListener('click', async () =>{
await selectPort();
});


document
.getElementById("send-protocol")
.addEventListener('click', async () =>{
await sendProtocol();
});


var port;

async function selectPort ()
{
    // await closePort();
    if(  !("serial" in navigator)  )
    {
        alert("Navegador não e compativel");
        return;
    }
    port = await navigator.serial.requestPort();
    await port.open({baudRate:9600});

    window.addEventListener("beforeunload", function (ev) {

        closePort();
        ev.returnValue = "Chrome/Blink/Webkit";
        return "Firefox/IE";
    }, false);
}

async function closePort()
{
    if(port !== undefined)
        await port.close();
}


async function sendProtocol ()
{
    const textEncoder = new TextEncoderStream();
    const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
    const writer = textEncoder.writable.getWriter();
    await writer.write(document.getElementById("protocol").value);
    writer.close();
    await closePort();
}


