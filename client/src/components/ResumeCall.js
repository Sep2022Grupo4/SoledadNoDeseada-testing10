function ResumeCall(props) {
    const call_id = props.call_id

    const handleResume = async (call_answer) => {
        async function finish() {
            const res = await fetch("/finishCall", {
                method: "POST",
                mode: "cors",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: call_id,
                    time_finish: new Date(),
                    answer: call_answer
                })
            })
            console.log( "Finaliza llamada: ",await res.json())
            if (!call_answer) {
                const addStrike = await fetch(`/increaseStrike/${props.id_user}`)
                let strikes = await addStrike.json()
                console.log("no contesta: ", strikes)
            } else {
                const rstStrike = await fetch(`/resetStrikes/${props.id_user}`)
                let strikes = await rstStrike.json()
                console.log("Contesta: ", strikes)
            }
            props.setShowResume(false)
        }
        finish();
    }


    return (<div className="ReportOverlay">
        <div className="report">
            <div className="report-call">
                <h3>Reporte de llamada</h3>
                <button className="btn-call" onClick={() => { handleResume(true) }} id="btn-si">Ha contestado</button>
                <button className="btn-call" onClick={() => { handleResume(false) }} id="btn-no">No ha contestado</button>
            </div>
        </div>
    </div>)
}


export default ResumeCall;