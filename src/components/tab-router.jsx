
import React from "react";
import {Col} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Icon} from 'react-font-awesome-5';
//Note:  Using raw Bootstrap markup instead of react-bootstrap components to avoid having nested a tags in tab links

export default ({tabs, selectedIndex, onSelect, onClose, routes}) =>
    <div>
        <ul className="nav nav-tabs">
            {tabs.map((tab, index) =>
                <li
                    key={index}
                    className={selectedIndex === index ? "active" : ""}
                >
                    <Link to={tab.path} onClick={onSelect(index)} style={{paddingRight: "15px"}}>
                        {tab.label}&nbsp;&nbsp;
                    </Link>
                    <Icon.Times onClick={onClose(index, tab.path)} style={{
                        position: "absolute",
                        right: "8px",
                        top: "8px"
                    }}/>
                </li>
            )}
        </ul>
        <Col xs={12} style={{paddingTop: "8px"}}>
            {routes}
        </Col>
    </div>;
