/// <reference path="../../types/load-script.d.ts"/>
declare var MathJax: any

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import loadScript from 'load-script'

const DEFAULT_SCRIPT: string =
  process.env.MATHJAX_CDN ||
  'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML'

const DEFAULT_OPTIONS = {
  showProcessingMessages: false,
  messageStyle: 'none',
  showMathMenu: false,
  showMathMenuMSIE: false,
  tex2jax: {
    processEnvironments: true,
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    preview: 'none',
    processEscapes: true
  }
}

export interface State {
  loaded: boolean
}

export interface Props {
  options: object
  script: string | boolean
}

/**
 * Context for loading mathjax
 * @type {[type]}
 */

export class Context extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.onLoad = this.onLoad.bind(this)
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    script: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
    options: PropTypes.object
  }

  static childContextTypes = {
    MathJax: PropTypes.object
  }

  static defaultProps = {
    script: DEFAULT_SCRIPT,
    options: DEFAULT_OPTIONS
  }

  state = {
    loaded: false
  }

  getChildContext() {
    return {
      MathJax: typeof MathJax === 'undefined' ? undefined : MathJax
    }
  }

  componentDidMount() {
    const { script } = this.props
    if (!script) {
      return this.onLoad()
    }
    loadScript(script, this.onLoad)
  }

  onLoad() {
    const { options } = this.props
    MathJax.Hub.Config(options)

    this.setState({
      loaded: true
    })
  }

  render() {
    const { children } = this.props
    return React.Children.only(children)
  }
}
