import React from 'react'
import { Modal, Button } from 'antd';

export default class Submit extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
    this.props.sendMessge();
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          提交
        </Button><span>点击左上角LOGO关闭并清空编辑页面/支持HTML书写/左侧为编辑窗口/右侧为预览窗口</span>
        <Modal
          title="请确认提交"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>提交不可撤回不可更改,请确认提交</p>
        </Modal>
      </div>
    );
  }
}
