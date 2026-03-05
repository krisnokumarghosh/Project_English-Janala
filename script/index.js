const creatElements = (arr) =>{
    const htmlElem = arr.map((el) => `<span class="btn bg-[#EDF7FF]">${el}</span>`);
    return(htmlElem.join(" "));
    
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const manageSpinner = (status) => {
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }
}



const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
}


const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");
    lessonBtn.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) =>{
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const clickedBtn = document.getElementById(`lesson-btn-${id}`);
        clickedBtn.classList.add("active");

        displayLevelWord(data.data);
    } ) 
}


const loadWorsDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWorsDetail(details.data);
}


const displayWorsDetail = (word) => {
    console.log(word);

    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    
        <div class="mb-[25px]">
        <h2 class="text-[26px] font-semibold font-bangla"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      </div>
      <div class="space-y-[10px] mb-[25px]">
        <h2 class="text-[20px] font-semibold">Meaning</h2>
        <p class="font-medium text-[18px] font-bangla">${word.meaning}</p>
      </div>
      <div class="space-y-[10px] mb-[25px]">
        <h2 class="text-[20px] font-semibold">Example</h2>
        <p class="text-[18px] ">${word.sentence}</p>
      </div>
      <div class="space-y-[10px] mb-[25px] ">
        <h2 class="text-[20px] font-semibold font-bangla">সমার্থক শব্দ গুলো</h2>
        <div class=" flex items-center gap-[8px]">
        ${creatElements(word.synonyms)}
        </div>
      </div>
      

    `;

    document.getElementById("word_modal").showModal();
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
        manageSpinner(false);

        return;
    }

    words.forEach((word) =>{
        // console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        
            <div class="bg-white rounded-md text-center px-[20px] py-[56px] space-y-4">
          <div class="space-y-[20px]">
            <h2 class="font-bold text-[20px]">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium ">meaning/pronounciation</p>
            <div class="font-bangla font-semibold text-[20px] text-[#18181B]">"${word.pronunciation ? word.pronunciation : 'শব্দ পাওয়া যায়নি'} / ${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'}"</div>
          </div>
            <div class="flex justify-between items-center">
                <button onclick="loadWorsDetail(${word.id})" class="btn btn-soft btn-info"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn btn-soft btn-info"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>

        `

        wordContainer.append(card);

        manageSpinner(false);
        
    })
    
}

const displayLesson = (lessons) =>{
    console.log(lessons);

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
         <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
         <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
         </button>
        
        `

        levelContainer.append(btnDiv)
    }
}

loadLessons();


document.getElementById('btn-search').addEventListener('click' , ()=>{
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue)

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then((res) => res.json())
    .then((data) => {
        const allWords = data.data;
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
        
    })
})