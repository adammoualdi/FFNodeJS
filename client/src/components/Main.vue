<template>
  <div class="autocomplete">
    <h1>Get player</h1>
    <Autocomplete v-bind:items="input" @SearchButtonClicked="getSearch"> </Autocomplete>
    <div class="playerInfo" v-if="ictIndex!=''">
      <p>ICT Index {{ ictIndex }} </p>
      <img :src="image">
    </div>
  </div>
</template>

<script>
import Autocomplete from '@/components/Autocomplete'
import PostsService from '@/services/PostsService'
const IMAGE_URL = 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/'
export default {
  name: 'Main',
  components: {
    Autocomplete
  },
  data () {
    return {
      search: '',
      data: [],
      input: [],
      ictIndex: '',
      image: ''
    }
  },
  mounted () {
    // Get data on load
    this.getData()
  },
  methods: {
    setData (data) {
      this.data = data
    },
    async getData () {
      // Use proxy API to gain CORS permissions to FF API.
      const response = await PostsService.getAPIData()
      this.data = response.data.contents
      console.log('get FF API data')
      // Create list of players with their first name and second name concatenated
      for (var i = 0; i < this.data.length; i++) {
        var player = this.data[i]
        this.input.push(player.first_name + ' ' + player.second_name)
      }
    },
    getSearch (data) {
      this.search = data
      // Split name using delimiter
      var name = this.search.split(' ')
      for (data in this.data) {
        if (this.data[data].first_name === name[0] && this.data[data].second_name === name[1]) {
          // When player found, break loop
          this.ictIndex = this.data[data].ict_index
          var imageId = this.data[data].photo
          var imagePref = imageId.split('.')
          imageId = 'p' + imagePref[0] + '.png'
          this.image = IMAGE_URL + imageId
          console.log(this.image)
          break
        }
      }
    }
  }
}
</script>

<style>
 .autocomplete {
    position: relative;
    width: 200px;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>
