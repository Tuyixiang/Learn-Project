import React from 'react';
import Iframe from 'react-iframe';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { IUiStateSlice, STATE_UI } from '../redux/reducers';
import { UiState } from '../redux/reducers/ui';
import { DetailPaneProps } from '../types/ui';

import ContentIgnoreSetting from './ContentIgnoreSetting';
import ContentDetail from './ContentDetail';

import styles from '../css/main.css';

class DetailPane extends React.PureComponent<DetailPaneProps, never> {
  public render() {
    if (this.props.showIgnoreSettings) {
      return <ContentIgnoreSetting />;
    }
    if (this.props.content !== undefined) {
      return <ContentDetail content={this.props.content} />;
    }
    return (
      <section
        style={{
          height: 'calc(100% - 64px)',
          width: '100%',
          position: 'relative',
        }}
      >
        <Iframe className={styles.web_frame} url={this.props.url} />
      </section>
    );
  }
}

const mapStateToProps = (state: IUiStateSlice): DetailPaneProps => {
  const uiState = state[STATE_UI] as UiState;
  return {
    url: uiState.detailUrl,
    content: uiState.detailContent,
    showIgnoreSettings: uiState.showContentIgnoreSetting,
  };
};

export default connect(mapStateToProps)(DetailPane);
