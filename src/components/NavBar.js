import React from "react";


export default function Recipe(props) {

    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <p className="navbar-brand">Sheep Food</p>
                    </div>

                    <div className="navbar-form navbar-left">
                        <div className="form-group">
                            <input
                                id="searchInput"
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                onChange={evt => props.onChange(evt)}/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}