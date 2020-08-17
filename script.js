const songApi = "https://api.lyrics.ovh/";

var songName = document.getElementById('songName');
const songSearchBtn = document.getElementById('songSearchBtn');
songSearchBtn.addEventListener('click',function(){
    getSongResult(songName.value); 
    songName.value =''; 
})

//Get Song Result 
function getSongResult(value){
    fetch(`${songApi}/suggest/${value}`)
    .then(res => res.json())
    .then(data =>{
        showSongResult(data);
    })
}

//get song lyrics 
function getSongLyrics(artist, title){
    fetch(`${songApi}v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            showSongLyric(data,artist,title);
            })
}

//show song lyrics
function showSongLyric(data,artist,title){
    if (data.lyrics){
        document.getElementById('fullLyricTitle').innerHTML = `${title} ~ ${artist} ~`;
        document.getElementById('fullLyric').innerHTML = `${data.lyrics}`;
    }
    else{
        document.getElementById('fullLyricTitle').innerHTML = `${title} - ${artist}`;
        document.getElementById('fullLyric').innerHTML = "Sorry, Lyric is Not Available for This Song";
    }
    
}


function showSongResult(data){
    //const element = data;
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML ='';

    for (var i=0 ; i<10;i++){
        const item = data.data[i];
        
        const title = `${data.data[i].title}`;
        const album = `${data.data[i].album.title}`;
        const artist = `${data.data[i].artist.name}`;
        const img =`${data.data[i].album.cover_small}`;

        searchResult.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                        <div class="col-md-9">
                                            <h3 class="lyrics-name">Song : ${title}</h3>
                                            <h4 class="lyrics-name">Album : ${album}</h4>
                                            <p class="author lead">By " ${artist} "</p>
                                            <img src="${img}" class="songAlbumImg">
                                        </div>
                                        <div class="col-md-3 text-md-right text-center">
                                            <button onclick = "getSongLyrics('${artist}','${title}')" class="btn btn-success get-lyric-btn">Get Lyrics</button>
                                        </div>
                                    </div>`;
    }
    document.getElementById('fullLyricTitle').innerHTML='';
    document.getElementById('fullLyric').innerHTML ='';

}
 