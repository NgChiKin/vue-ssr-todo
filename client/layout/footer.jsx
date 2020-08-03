import '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'ngchikin'
    }
  },
  render () {
    return (
      <div id='footer'>
        <span>Writer by {this.author}</span>
      </div>
    )
  }
}
