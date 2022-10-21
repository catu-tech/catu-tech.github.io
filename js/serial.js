


document
    .getElementById("selectPort")
    .addEventListener('click', async () =>{
    await selectPort();
});


var port;

async function selectPort ()
{
    if(  !("serial" in navigator)  )
    {
        alert("Navegador não e compativel");
        return;
    }
    port = await navigator.serial.requestPort();
    await port.open({baudRate:9600});
}



async function readSerialPort ()
{

    while(port.readable)
    {
        const reader = port.readable.getReader();

        try{
            while(true){
                const {value, done} = await reader.read();
                if (done) {
                    // Allow the serial port to be closed later.
                    reader.releaseLock();
                    break;
                }
                if(value) {
                    console.log(value);
                }
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
}


// async function readSerialPort ()
// {

//     while(port.readable)
//     {
//         // const reader = port.readable.getReader();
//         const decoder = new TextDecoderStream();
//         port.readable.pipeTo(decoder.writable);
//         const inputStream = decoder.readable;
//         const reader = inputStream.getReader();

//         try{
//             while(true){
//                 const {value, done} = await reader.read();
//                 if (done) {
//                     // Allow the serial port to be closed later.
//                     reader.releaseLock();
//                     break;
//                 }
//                 if(value) {
//                     console.log(value);
//                 }
//             }
//         }
//         catch(error)
//         {
//             console.log(error);
//         }
//     }
// }


// var port;
// function writeSerialPort ()
// {

//     if(  !("serial" in navigator)  )
//     {
//         alert("Navegador não e compativel");
//         return;
//     }

//     port = await navigator.serial.requestPort();
//     await port.open({baudRate: 9600});

//     // const writer = port.writable.getWriter();

//     // const data = new Uint8Array

    // const textEncoder = new TextEncoderStream();
    // const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

    // const writer = textEncoder.writable.getWriter();

//     await writer.write("hello");
// }


