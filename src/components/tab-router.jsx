
import React from "react";
import {Tabs, Tab, Col} from "react-bootstrap";
import {Link} from 'react-router-dom';

export default ({tabs, selectedIndex, onSelect, onClose, routes}) =>
    <div>
        <Tabs
            activeKey={selectedIndex}
            onSelect={() => {}}
            id="tabPanel"
        >
            {tabs.map((tab, index) =>
                <Tab
                    key={index}
                    eventKey={index}
                    title={
                        <span>
                            <Link to={tab.path} onClick={onSelect(index)}>
                                {tab.label}&nbsp;&nbsp;
                            </Link>
                            <i className="fa fa-times" onClick={onClose(index, tab.path)} />
                        </span>
                    }
                />
            )}
        </Tabs>
        <Col xs={12} style={{paddingTop: "8px"}}>
            {routes}
        </Col>
    </div>;
