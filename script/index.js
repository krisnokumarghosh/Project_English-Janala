
const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
}

const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data)) 
}


const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if(words.length == 0){
       
        wordContainer.innerHTML = `
        
        <div class="text-center col-span-full space-y-[16px]">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p class="font-bangla  text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="font-bangla font-medium text-[34px] text-[#292524]">নেক্সট Lesson এ যান</h2>
        </div>
        
        `

        return;
    }

    words.forEach((word) =>{
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        
            <div class="bg-white rounded-md text-center px-[20px] py-[56px] space-y-4">
          <div class="space-y-[20px]">
            <h2 class="font-bold text-[20px]">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium ">meaning/pronounciation</p>
            <div class="font-bangla font-semibold text-[20px] text-[#18181B]">"${word.pronunciation ? word.pronunciation : 'শব্দ পাওয়া যায়নি'} / ${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'}"</div>
          </div>
            <div class="flex justify-between items-center">
                <button class="btn btn-soft btn-info"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn btn-soft btn-info"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>

        `

        wordContainer.append(card);
        
    })
    
}

const displayLesson = (lessons) =>{
    console.log(lessons);

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
         <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
         <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
         </button>
        
        `

        levelContainer.append(btnDiv)
    }
}

loadLessons()