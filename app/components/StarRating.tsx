import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import unselectIcon from '../assets/icons/icon_star_gray.png';
import selectIcon from '../assets/icons/icon_star_yellow.png';
import selectHaflIcon from '../assets/icons/icon_star_half.png';

interface IProps {
  /** 总评分 */
  totalScore?: number;
  /** 当前评分 */
  currentScore?: number;
  /** 宽度 */
  starWidth?: number;
  /** 高度 */
  starHeight?: number;
}

interface IState {
}

class StarRating extends Component<IProps, IState>  {
  static defaultProps = {
    totalScore: 10,
    currentScore: 8,
    starWidth: 30,
    starHeight: 30,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
    };
  }

  _onClickScore() {

  }

  _addSelectIcon(i: number, starSize: any) {
    if (i < 3) {
      return <Image source={selectIcon} style={[starSize]}/>;
    } else if (i === 3) {
      return <Image source={selectHaflIcon} style={[starSize]}/>;
    }
  }

  _addScoreIcon() {
    const starSize = {
      width: px2dp(this.props.starWidth),
      height: px2dp(this.props.starHeight),
    };
    const images = [];
    for (let i = 1; i <= 5; i++) {
      images.push(
        <TouchableWithoutFeedback key={'i' + i} onPress={() => { this._onClickScore(); }}>
          <View style={starSize}>
            <Image source={unselectIcon} style={[styles.unselectedStyle, starSize]}/>
            {this._addSelectIcon(i, starSize)}
          </View>
        </TouchableWithoutFeedback>,
      );
    }
    return images;
  }

  render() {
    return (
      <View style={styles.container}>
        {this._addScoreIcon()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unselectedStyle: {
    position: 'absolute',
  },
  selectedStyle: {
  },
});

export default StarRating;
