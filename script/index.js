
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

    words.forEach((word) =>{
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        
            <div class="bg-white rounded-md text-center px-[20px] py-[56px] space-y-4">
          <div class="space-y-[20px]">
            <h2 class="font-bold text-[20px]">${word.word}</h2>
            <p class="font-medium ">meaning/pronounciation</p>
            <div class="font-bangla font-semibold text-[20px] text-[#18181B]">"${word.pronunciation} / ${word.meaning}"</div>
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