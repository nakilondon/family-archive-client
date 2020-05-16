import React, { Component } from "react";
import FamilyTreeDiagram from "./FamilyDiagram";
import Grid from "@material-ui/core/Grid";
import { getFamilyTree } from "../api/familyTreeApi";

//const baseUrl = process.env.REACT_APP_API_URL + "familytree";
const baseUrl = "familytree";

export default class FamilyTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsData: [],
      title: null,
      loading: true,
    };
  }

  componentDidMount() {
    //const data = <getFamilyTree />;
    //this.setState({ itemsData: data, loading: false });
    this.populateItems();
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <FamilyTreeDiagram
        familyItems={this.state.itemsData}
        id={this.props.id}
        selectedPerson={this.props.selectedPerson}
      />
    );

    return (
      <Grid container align="center">
        {contents}
      </Grid>
    );
  }

  async populateItems() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    this.setState({ itemsData: data, loading: false });
  }
}
