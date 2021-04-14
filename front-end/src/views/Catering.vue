<template>
  <div class="catering">
    <div class="pageHeader">
      <h1 class="center">CATERING</h1>
    </div>

    <div class="content center" id="catering-content">
      <p>Welcome! We do catering for events with 10 or more plates. We have catered for events like:</p>
      <ul>
        <li>Weddings</li>
        <li>Brunches</li>
        <li>Baby Announcement or Showers</li>
        <li>Luncheons</li>
        <li>Engagement Parties</li>
        <li>and More!</li>
      </ul>
      <p>Pricing depends on the number of people, number of dishes or courses, etc. So please give us a call or submit the form below to get a quote!</p>
      <p>MWF 7:30AM–5PM</p>
      <p>(212) 555-0044</p>
    </div>
    <iframe class="center"
      src="https://docs.google.com/forms/d/e/1FAIpQLSfEK4xZ-kopabGU5SxWqPXHd4JNMKOv-egNU7gRmAhZQjDi-A/viewform?embedded=true"
      width="640"
      height="1700"
      frameborder="0"
      marginheight="0"
      marginwidth="0">Loading…
    </iframe>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.center {
  width: 65%;
}
#catering-content {
  margin-top: 100px;
  margin-bottom: 100px;
}
#catering-content ul {
  font-family: 'Prata', serif;
  text-transform: uppercase;
  margin-top: 50px;
  margin-bottom: 50px;
  list-style: none;
  padding-inline-start: 0px;
}
#catering-content li {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
