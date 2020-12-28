import React, { Component, createRef } from 'react';
import { FamDiagram } from 'basicprimitivesreact';
import { Enabled, NeighboursSelectionMode } from "basicprimitives";
import ResizeObserver from "resize-observer-polyfill";

import './FamilyTree.css'

export default class FamilyTreeDiagram extends Component {
    resizeObserver = null;
    resizeSubject = createRef();
    state = {};

    constructor(props) {
        super(props);
        this.onCursorChanged = this.onCursorChanged.bind(this);
    };

    componentDidMount() {
        if ("ResizeObserver" in window) {
            this.observe(ResizeObserver);
        } else {
            import("resize-observer-polyfill").then(this.observe);
        }
    }

    componentWillUnmount() {
        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        }
      }
    
      observe = RO => {
        this.resizeObserver = new RO(entries => {
          const {
            width,
            height,
            top,
            right,
            bottom,
            left
          } = entries[0].contentRect;
          this.setState({ width, height, top, right, bottom, left });
        });
    
        if (this.resizeSubject.current) {
          this.resizeObserver.observe(this.resizeSubject.current);
        }
      };
    

    onCursorChanged(event, data) {
        const { context: item } = data;
        if (item != null) {
           this.props.selectedPerson(item.id);
        };
    };

    renderDiagram(items, CursorChange, id) {
        let config = {
            cursorItem: id,
            
            
            neighboursSelectionMode: NeighboursSelectionMode.ParentsChildrenSiblingsAndSpouses,
            hasSelectorCheckbox: Enabled.False,
            normalLevelShift: 20,
            dotLevelShift: 20,
            lineLevelShift: 10,
            normalItemsInterval: 10,
            dotItemsInterval: 10,
            lineItemsInterval: 4,
            items: items
          };

        return <div ref={this.resizeSubject} className="FamilyTree" >
            <FamDiagram centerOnCursor={true} onCursorChanged={CursorChange} config={config} />
        </div>
    }


    render() {
        return this.renderDiagram(this.props.familyItems, this.onCursorChanged, this.props.id);
    }

}