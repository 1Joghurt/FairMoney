import "./GroupHistory.scss";
import Header from "../../../../components/Header/Header.jsx";
import * as React from "react";
import {useEffect} from "react";
import {fetchGroupHistory} from "../../../../shared/backend.js";
import HistoryItem from "../../../../components/HistoryItem/HistoryItem.jsx";
import {showErrorPage} from "../../../../shared/error.js";


export default function GroupHistory({onBackClick, group, login}) {
    const [history, setHistory] = React.useState(null)
    const [showHistory, setShowHistory] = React.useState(false)


    useEffect(() => {
        const getHistory = async () => {
            const result = await fetchGroupHistory(group.uuid)
            if (result.ok) {
                const data = await result.json()
                setHistory(data);
            } else {
                showErrorPage(result)
            }
        }

        getHistory().then(() => setShowHistory(true))
    }, [group.uuid]);


    return (
        <div id="group_history_container" className="default_page_container">
            <Header onBackClick={() => onBackClick()}/>
            <div className="headline_text headline_less_space">Hallo {login}, das ist in der Gruppe passiert.</div>
            {showHistory && (
                <div id="history_container">
                    {history && history.map((item, idx) => (<HistoryItem key={idx}
                                                                         group={group}
                                                                         item={item}/>))}
                </div>
            )}
        </div>
    );
}
