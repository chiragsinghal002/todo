import React, { useState, useReducer } from 'react'

export default function Home() {
    const [data, setData] = useState([]);
    const [task, setTask] = useState("");
    const [state, dispatch] = useReducer(reducer, 0);
    const [show, setshow] = useState(true);

    function reducer(state, action) {
        switch (action.type) {
            case 'updateDone':
                // console.log(action.type.id);
                setData(data.map((item, index) => {
                    if (action.id == index) {
                        return { ...item, "task": task }
                    }
                    return item;
                }))
                setTask('');
                break;
            case 'updateItem':
                const getitem = data.find((item, index) => {
                    return index == action.id;
                })

                setTask(getitem.task);

                break;
            case 'deleteItem':
                setData(data.filter((item, index) => {
                    return index !== action.id;
                }))
                break;
            case 'addItem':
                if (task !== "") {
                    setData([...data, { "task": task }]);
                    setTask('');
                }
                break;
        }


    }


    return (
        <div>
            <div className="row d-flex justify-content-center container">
                <div className="col-md-8">
                    <div className="card-hover-shadow-2x mb-3 card">
                        <div className="card-header-tab card-header">
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal"><i className="fa fa-tasks"></i>&nbsp;Task Lists</div>
                        </div>
                        <div className="scroll-area-sm">
                            <perfect-scrollbar className="ps-show-limits">
                                <div style={{ "position": 'static' }} className="ps ps--active-y">
                                    <div className="ps-content">
                                        <ul className=" list-group list-group-flush">
                                            {
                                                data.map((notes, index) => {
                                                    return (
                                                        <li className="list-group-item" key={notes.id}>
                                                            <div className="todo-indicator bg-focus"></div>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-2">
                                                                        <div className="custom-checkbox custom-control"><input className="custom-control-input" id="exampleCustomCheckbox1" type="checkbox" /><label className="custom-control-label" for="exampleCustomCheckbox1">&nbsp; </label></div>
                                                                    </div>
                                                                    <div className="widget-content-left">
                                                                        <div className="widget-heading">{notes.task}</div>
                                                                        <div className="widget-subheading">
                                                                            <div>By Johnny <div className="badge badge-pill badge-info ml-2">NEW</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <button className="border-0 btn-transition btn btn-outline-danger" onClick={(e) => dispatch({ "type": "updateDone", "id": index })}> <i className="fa fa-pencil"></i></button>
                                                                        <button className="border-0 btn-transition btn btn-outline-success" onClick={(e) => dispatch({ "type": "updateItem", "id": index })}> <i className="fa fa-pencil"></i></button>
                                                                        <button className="border-0 btn-transition btn btn-outline-danger" onClick={(e) => dispatch({ "type": "deleteItem", "id": index })}> <i className="fa fa-trash"></i> </button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </perfect-scrollbar>
                        </div>
                        <div className="d-block text-right card-footer">
                            <input className="" type="text" onChange={(e) => setTask(e.target.value)} value={task} />
                            <button className="btn btn-primary" onClick={(e) => dispatch({ "type": "addItem" })}>Add Task</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
