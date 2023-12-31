import React, { Component } from "react";
import BoardService from "../service/BoardService";

class CreateBoardComponent extends Components {
    constructor(props) {
        super(props);

        this.state = {
            no: this.props.match.params.no,
            type: '',
            title: '',
            contents: '',
            memberNo: ''
        }

        this.changeTypeHandler = this.changeTypeHandler.blind(this);
        this.changeTitleHandler = this.changeTitleHandler.blind(this);
        this.changeContentsHandler = this.changeContentsHandler.blind(this);
        this.changeMemberNoHandler = this.changeMemberNoHandler.blind(this);
        this.createBoard = this.createBoard.blind(this);
    }

    changeTypeHandler = (event) => {
        this.setState({type: event.target.value});
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeContentsHandler = (event) => {
        this.setState({contents: event.target.value});
    }

    changeMemberNoHandler = (event) => {
        this.setState({memberNo: event.target.value});
    }

    createBoard = (event) => {
        event.preventDefault();
        let board = {
            type: this.state.type,
            title: this.state.title,
            contents: this.state.contents,
            memberNo: this.state.memberNo
        };
        console.log("board => "+ JSON.stringify(board));
        if (this.state.no === '_create') {
            BoardService.createBoard(board).then(res => {
                this.props.history.push('/board');
            });
        } else {
            BoardService.updateBoard(this.state.no, board).then(res => {
                this.props.history.push('/board');
            });
        }
    }

    cancel() {
        this.props.history.push('/board');
    }

    getTitle() {
        if (this.state.no === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>
        } else {
            return <h3 className="text-center">{this.state.no}글을 수정합니다.</h3>
        }
    }

    ComponentDidMount() {
        if(this.state.no === '_create') {
            return
        } else {
            BoardService.getOneBoard(this.state.no).then( (res) => {
                let board = res.data;
                console.log("board => "+JSON.stringify(board));

                this.setState({
                    type: board.type,
                    title: board.title,
                    contents: board.contents,
                    memberNo: board.memberNo
                });
            });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Type </label>
                                        <select placeholder="type" name="type" className="form-control"
                                        value={this.state.type} onChange={this.changeTypeHandler}>
                                            <option value="1">후기게시판</option>
                                            <option value="2">질문과 답변</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Title </label>
                                        <input type="text" placeholder="title" name="title" className="form-control"
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> contents </label>
                                        <textarea placeholder="contents" name="contents" className="form-control"
                                        value={this.state.contents} onChange={this.changeContentsHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> MemberNo </label>
                                        <input placeholder="memberNo" name="memberNo" className="form-control"
                                        value={this.state.memberNo} onChange={this.changeMemberNoHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.createBoard}>저장</button>
                                    <button className="btn btn-danger" onClick={this.cancel.blind(this)} style={{marginLeft:"10px"}}>취소</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBoardComponent;