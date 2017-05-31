import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { addStar, reduceStar, order } from '../action/addAction'
import BtnLike from '../graphics/BtnLike'
import DislikeBtn from '../graphics/BtnDislike'
import './home.less'

const propTypes = {
  addStar: PropTypes.func.isRequired,
  reduceStar: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired,
  order: PropTypes.func.isRequired,
}

class Home extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.changeClick = this.changeClick.bind(this)
  }

  componentDidMount() {
    this.props.order()
  }

  handleClick() {
    this.props.addStar()
  }

  changeClick() {
    this.props.reduceStar()
  }

  render() {
    const { num } = this.props
    return (
      <div className="Demo-home">
        <em className="Love">Lov</em>
        <br />
        <em className="compony">meituan</em>
        <p className="num">{ num }<em className="title">点赞数</em></p>
        <button onClick={this.handleClick} className="vote">
          <BtnLike className="voteBtn" />
        </button>
        <button onClick={this.changeClick} className="disVote">
          <DislikeBtn className="disVoteBtn" />
        </button>
      </div>
    )
  }
}

Home.propTypes = propTypes

const mapStateToProps = (state) => {
  const { addStart: { num } } = state
  return {
    num: num,
  }
}

export default connect(mapStateToProps, { addStar, reduceStar, order })(Home)
