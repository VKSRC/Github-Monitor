import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Tag, Button } from '@icedesign/base';


const { Row, Col } = Grid;
const ButtonGroup = Button.Group;

export default class Item extends Component {
  static displayName = 'Item';

  constructor(props){
    super(props);
  }

  render() {
    return (
      <IceContainer>
        <div style={styles.code_list_item}>
          <Row>
            <Col l="24">
              <a href="#">
                <img src="https://avatars2.githubusercontent.com/u/9148638?s=64&v=4" height="32" width="32"
                     style={styles.avatar}/>
              </a>
              <span style={styles.code_type}>
                <ButtonGroup>
                  <Button type="primary">确认</Button>
                  <Button type="primary">处理</Button>
                  <Button type="primary">加白</Button>
                </ButtonGroup>
              </span>

              <Col l="24" className="leakage">
                <a href="index.js" style={styles.code_title}>Strikersb/Wscanner</a>
                <span style={{margin: '0 4px'}}>–</span>
                <a href="#">2017-04-30-vipkid-intro.md</a>

                <div className="mb-8">
                  <span><Tag shape="readonly" size="small">Markdown</Tag></span>
                  <span className="text-gray"><Tag shape="readonly" size="small">2017-05-08 12:09:11</Tag></span>
                </div>

                <div className="code-list">
                  <div className="file-box blob-wrapper">
                    <table className="highlight">
                      <tbody>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L13">13</a>
                        </td>
                        <td className="blob-code blob-code-inner"><span className="pl-c"><span className="pl-c">#</span>VIPKID学习中心客户端：主页卡片中存在待测试课程卡片，并将VIPKID客户端最大化，再计算卡片【进教室】按钮位置</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L14">14</a>
                        </td>
                        <td className="blob-code blob-code-inner">
                        </td>
                      </tr>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L15">15</a>
                        </td>
                        <td className="blob-code blob-code-inner"><span className="pl-c"><span className="pl-c">#</span> 运行VIPKID客户端，建议测试时直接开启VIPKID客户端并最大化，暂时注掉此步骤</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L16">16</a>
                        </td>
                        <td className="blob-code blob-code-inner"><span className="pl-c"><span className="pl-c">#</span>packagepath_<em>VIPKID</em> = os.chdir("C:\\Program Files (x86)\\<em>VIPKID</em>")</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L17">17</a>
                        </td>
                        <td className="blob-code blob-code-inner"><span className="pl-c"><span
                          className="pl-c">#</span>os.system("start <em>VIPKID</em>.exe")</span></td>
                      </tr>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L18">18</a>
                        </td>
                        <td className="blob-code blob-code-inner"><span className="pl-c"><span className="pl-c">#</span>time.sleep(10)</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L19">19</a>
                        </td>
                        <td className="blob-code blob-code-inner">
                        </td>
                      </tr>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L20">20</a>
                        </td>
                        <td className="blob-code blob-code-inner"><span className="pl-c"><span className="pl-c">#</span>获取VIPKID窗口句柄</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L21">21</a>
                        </td>
                        <td className="blob-code blob-code-inner">titlename_<em>VIPKID</em> <span
                          className="pl-k">=</span> <span className="pl-s"><span
                          className="pl-pds">"</span>VIPKID学习中心<span className="pl-pds">"</span></span></td>
                      </tr>
                      <tr>
                        <td className="blob-num">
                          <a
                            href="/liyao503/PC-learning-center/blob/f2cbd495085974a553aba2c5b0965fd87402dd44/VIPKID_enterclassroom.py#L22">22</a>
                        </td>
                        <td className="blob-code blob-code-inner">hwnd_<em>VIPKID</em> <span
                          className="pl-k">=</span> win32gui.FindWindow(<span className="pl-c1">None</span>,
                          titlename_VIPKID)
                        </td>
                      </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </div>

      </IceContainer>
    );
  }

}


const styles = {
  code_list_item: {
    margin: '-20px -15px',
    lineHeight: 1.5,
    color: '#24292e',
  },
  avatar: {
    float: 'left',
    overflow: 'hidden',
    lineHeight: 1,
    verticalAlign: 'middle',
    borderRadius: '3px',
    marginRight: '8px',
  },
  code_type: {
    float: 'right',
    fontSize: '12px',
    color: '#586069',
  },
  code_title: {
    fontWeight: '500',
    color: '#0366d6',
    fontSize: '14px',
    lineHeight: 1.5,
  },
};
