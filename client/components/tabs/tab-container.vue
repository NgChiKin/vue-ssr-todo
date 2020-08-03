<script>
export default {
  name: 'TabContent',
  props: {
    panes: {
      type: Array,
      required: true
    }
  },
  render() {
    const contents = this.panes.map(value => value.active ? value.$slots.default : null)
    return (
    <div class="tab-content">
       {contents}
    </div>
    )
  }
};
</script>
