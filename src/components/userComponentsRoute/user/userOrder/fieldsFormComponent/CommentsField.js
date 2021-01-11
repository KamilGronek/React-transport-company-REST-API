import React, { Component } from "react";

class CommentsField extends Component {
  render() {
    const { comments, handleChangeBase } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          Comments:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <input
            className="form-control"
            type="text"
            id="comments"
            name="comments"
            value={comments}
            onChange={handleChangeBase}
            placeholder="Comments"
          />
        </div>
      </div>
    );
  }
}

export default CommentsField;
