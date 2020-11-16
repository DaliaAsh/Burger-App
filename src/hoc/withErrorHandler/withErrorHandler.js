import React, { Component } from "react";
import Modal from "../../components/UI/Model/Model";
import Aux from "../Auxiliary/Auxiliary";
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
      console.log("WillUnMount", this.reqInterceptor, this.resInterceptor);
    }
    state = {
      error: null,
    };
    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(null, (req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(null, (error) => {
        this.setState({ error: error });
      });
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
