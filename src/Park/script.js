document.addEventListener("DOMContentLoaded", (e) => {
    const moneyLabel = document.getElementById("money")
    const researchBtn = document.getElementById("researchBtn")
    const atractionsButton = document.getElementById("atractions")
    const terraformButton = document.getElementById("terraforming")
    const demolishButton = document.getElementById("demolish")

    const selectMenu = document.getElementById("sMenu")
    const researchWindow = document.getElementById("researchWindow")
    const terraformWindow = document.getElementById("terraformWindow")
    const fenceMenu = document.getElementById("fenceMenu")

    const waitTxt = document.getElementById("waiting")
    const rWait = document.getElementById("rWait")

    const fenceBtn = document.getElementById("fenceBtn")
    const fence1ABtn = document.getElementById("fence1ABtn")
    const fence2ABtn = document.getElementById("fence2ABtn")

    const minusBtn = document.getElementById("minusBtn")
    const plusBtn = document.getElementById("plusBtn")

    const dinoBtn = document.getElementById("dinoBtn")
    const bigDinoBtn = document.getElementById("bigDinoBtn")
    const spinoBtn = document.getElementById("spinoBtn")
    const herbDinoBtn = document.getElementById("herbDinoBtn")
    const saurDinoBtn = document.getElementById("saurDinoBtn")
    const trikeBtn = document.getElementById("trikeBtn")

    const contentContainer = document.getElementById("contentContainer")
    const content = document.getElementById("contentGrid")

    let money = 2500000
    let researchLevel = 1

    let researchEnabled = false
    let { spawnX, spawnY } = false
    let terraformX = 1
    let terraformY = 1

    moneyLabel.textContent = "$" + money

    let selectMode = false
    let researchMode = false
    let dinoSelectorMode = false
    let terraformMode = false
    let demolishMode = false

    let putFenceMode = false
    let putFence1AMode = false
    let putFence2AMode = false

    let terraformMinus = true
    let terraformPlus = false

    terraformMap()

    atractionsButton.addEventListener("click", () => {
        selectMode =! selectMode
        putFenceMode = false
        terraformMode = false
        demolishMode = false
        researchMode = false
        dinoSelectorMode = false
        selectMenu.classList.toggle("enabled", selectMode)
        content.classList.toggle("enabled", selectMode)
        fenceMenu.classList.remove("enabled")
        terraformWindow.classList.remove("enabled")
        researchWindow.classList.remove("enabled")

    })

    demolishButton.addEventListener("click", () => {
        demolishMode =! demolishMode
        putFenceMode = false
        selectMode = false
        researchMode = false
        terraformMode = false
        content.classList.toggle("enabled", demolishMode)
        fenceMenu.classList.remove("enabled")
        selectMenu.classList.remove("enabled")
        terraformWindow.classList.remove("enabled")
        researchWindow.classList.remove("enabled")
    })

    researchBtn.addEventListener("click", () => {
        if (researchLevel >= 6) {
            rWait.innerHTML = "All animals were researched"
        } if (selectMode || demolishMode || terraformMode) {
            return
        } else if (researchEnabled) {
            researchMode =! researchMode
            researchWindow.classList.toggle("enabled", researchMode)
        } else {
            researchMode =! researchMode
            researchWindow.classList.toggle("enabled", researchMode)
            researchEnabled = true
            putFenceMode = false
            demolishMode = false
            terraformMode = false
            dinoSelectorMode = false
            fenceMenu.classList.remove("enabled")
            research()
            setTimeout(() => {
                researchWindow.classList.remove("enabled")
                researchEnabled = false
            }, 8000)
        }
    })

    terraformButton.addEventListener("click", () => {
        terraformMode =! terraformMode
        selectMode = false
        demolishMode = false
        researchMode = false
        terraformWindow.classList.toggle("enabled", terraformMode)
        content.classList.toggle("enabled", terraformMode)
        fenceMenu.classList.remove("enabled")
        selectMenu.classList.remove("enabled")
        content.classList.remove("enabled")
        researchWindow.classList.remove("enabled")
    })

    fenceBtn.addEventListener("click", () => {
        putFenceMode =! putFenceMode
        putFence1AMode = false
        putFence2AMode = false
    })

    fence1ABtn.addEventListener("click", () => {
        putFence1AMode =! putFence1AMode
        putFenceMode = false
        putFence2AMode = false
    })

    fence2ABtn.addEventListener("click", () => {
        putFence2AMode =! putFence2AMode
        putFence1AMode = false
        putFenceMode = false
    })

    minusBtn.addEventListener("click", () => {
        terraformMinus =! terraformMinus
        terraformPlus = false
        minusBtn.classList.toggle("enabled", terraformMinus)
        plusBtn.classList.remove("enabled")
    })

    plusBtn.addEventListener("click", () => {
        terraformPlus =! terraformPlus
        terraformMinus = false
        plusBtn.classList.toggle("enabled", terraformPlus)
        minusBtn.classList.remove("enabled")
    })

    dinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("dino", "40px", 8000)
        }, 2000)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4000)
    })

    bigDinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("bigDino", "60px", 18000)
        }, 2500)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4500)
    })

    spinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("spino", "60px", 20000)
        }, 2500)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4500)
    })

    herbDinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("herbDino", "50px", 20000)
        }, 2000)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4000)
    })

    saurDinoBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("saurDino", "70px", 40000)
        }, 3000)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 5000)
    })

    trikeBtn.addEventListener("click", () => {
        delay()
        setTimeout(() => {
            createDinosaur("trike", "50px", 40000)
        }, 2000)
        delay()
        setTimeout(() => {
            delayEnd()
        }, 4000)
    })

    content.addEventListener("click", (event) => {        
            const rect = content.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            const cellX = Math.floor(offsetX / 800) + 1;
            const cellY = Math.floor(offsetY / 800) + 1;

            const existingImages = Array.from(content.children).find(img => {
                const imgX = parseInt(img.style.gridColumnStart, 10)
                const imgY = parseInt(img.style.gridRowStart, 10)
    
                return ( imgX === cellX && imgY === cellY )
            })

            console.log(cellX)

            setupEvent(event)

            if (dinoSelectorMode == false && selectMode == false && demolishMode == false ) {
                dinoSelectorMode = true
                putFenceMode = false
                fenceMenu.classList.toggle("enabled", dinoSelectorMode)
                selectMenu.classList.remove("enabled")
                researchWindow.classList.remove("enabled")
                spawnX = cellX
                spawnY = cellY
            } else {
                dinoSelectorMode = false
                fenceMenu.classList.remove("enabled")
            }

            if (existingImages) {
                if (demolishMode) {
                    destroyElement(existingImages, 5000)
                } 
            } else if (selectMode) {
                if (putFenceMode) {
                    createElement("fence", "../img/cerca.png", "800px", 90000)
                    terraformArea()
                } else if (putFence1AMode) {
                    createElement("fence1A", "../img/cerca-1A.png", "800px", 67500)
                } else if (putFence2AMode) {
                    createElement("fence2A", "../img/cerca-2A.png", "800px", 45000)
                }
            }

    })
    const step = 20
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w': 
            contentContainer.scrollTop -= step 
            break;
            case 's': 
            contentContainer.scrollTop += step 
            break;
            case 'a': 
            contentContainer.scrollLeft -= step 
            break;
            case 'd': 
            contentContainer.scrollLeft += step 
            break;
        }
    })
    let event = null

    function setupEvent(eventListener) {
        event = eventListener
    }

    function createElement(elementClass, src, size, cost) {
            
        const rect = content.getBoundingClientRect();
        const cellX = Math.floor((event.clientX - rect.left) / 800) + 1;
        const cellY = Math.floor((event.clientY - rect.top) / 800) + 1;
    
        const element = document.createElement('img')
        element.classList.add(elementClass)
        element.src = src
        element.style.height = size
        element.style.width = size
        element.style.gridColumnStart = cellX
        element.style.gridRowStart = cellY
        element.style.zIndex = "800"
        content.appendChild(element)
    
        money -= cost
        moneyLabel.textContent = "$" + money
    }

    function terraformMap() {
        for (let i = 0; i < 20; i++) {
            for (let e = 0; e < 20; e++) {
                terraformArea("tg")
                terraformY++
            }
            terraformX++
            terraformY = 1
        }
    }

    function terraformArea(type) {
        let plantNumber = 0
        let numberOfCycles =  0

        if (type == "tg") {
            plantNumber = Math.floor(Math.random() * 5) + 1
            if (plantNumber == 5) {
                numberOfCycles = Math.floor(Math.random() * 6) + 1
            } else {
                numberOfCycles = Math.floor(Math.random() * 18) + 4
            }
            plantNumber = Math.floor(Math.random() * 8) + 1
            if (plantNumber == 8) {
                terraform("../img/natureza/Lago.png", "300px", 2000, type)
            }
        } else if (terraformMinus) {
            numberOfCycles = Math.floor(Math.random() * 5) + 1
            terraform("../img/natureza/Lago.png", "300px", 2000, type)
        } else if (terraformPlus) {
            numberOfCycles = Math.floor(Math.random() * 12) + 1
            terraform("../img/natureza/Lago.png", "300px", 2000, type)
        }
        for (let i = 0; i < numberOfCycles; i++) {
            plantNumber = Math.floor(Math.random() * 3) + 1
            terraform(`../img/natureza/Arvore-${plantNumber}.png`, "120px", 100, type)
            plantNumber = Math.floor(Math.random() * 2) + 1
            terraform(`../img/natureza/Arbusto-${plantNumber}.png`, "80px", 100, type)
        }
    }

    function terraform(src, size, cost, type) {
        if (money <= 0) {
            return
        }
        let {cellX, cellY} = 0
        let {pTop, pLeft} = 0

        if (type == "tg") {
            cellX = terraformX
            cellY = terraformY
            pTop = Math.floor(Math.random() * 740) + 1
            pLeft = Math.floor(Math.random() * 740) + 1
        } else {
            const rect = content.getBoundingClientRect();
            cellX = Math.floor((event.clientX - rect.left) / 800) + 1;
            cellY = Math.floor((event.clientY - rect.top) / 800) + 1;
            pTop = Math.floor(Math.random() * 480) + 70
            pLeft = Math.floor(Math.random() * 480) + 70
        }
    
        const element = document.createElement('img')
        element.classList.add("nature")
        element.src = src
        element.style.height = size
        element.style.width = size
        element.style.top = pTop + "px"
        element.style.left = pLeft + "px"
        element.style.margin = "20px"
        if (src == "../img/natureza/Lago.png") {
            element.style.zIndex = 1
        } else if (src = "../img/natureza/Arbusto-1" || src == "..img/natureza/Arbusto-2") {
            element.style.zIndex = pTop - 60
        } else {
            element.style.zIndex = pTop
        }
        element.style.gridColumnStart = cellX
        element.style.gridRowStart = cellY
        content.appendChild(element)
    
        money -= cost
        moneyLabel.textContent = "$" + money
    
    }

    function createDinosaur(type, size, cost) {
        if (money <= 0) {
            return
        }
        const dino = document.createElement('img')
        dino.classList.add("animal")
        content.appendChild(dino)
        if (type == "dino") {
            dinoSkin = Math.floor(Math.random() * 4) + 1
            dino.src = `../img/dinos/dino-${dinoSkin}.png`
        } else if (type == "bigDino" && researchLevel >= 2) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/big-dino-${dinoSkin}.png`
        } else if (type == "herbDino" && researchLevel >= 3) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/herb-dino-${dinoSkin}.png`
        } else if (type == "saurDino" && researchLevel >= 4) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/saur-dino-${dinoSkin}.png`
        } else if (type == "spino" && researchLevel >= 5) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/spino-${dinoSkin}.png`
        } else if (type == "trike" && researchLevel == 6) {
            dinoSkin = Math.floor(Math.random() * 2) + 1
            dino.src = `../img/dinos/trike-${dinoSkin}.png`
        } else {
            content.removeChild(dino)
            waitTxt.innerText = "Unresearched dinosaur"
            setTimeout(() => {
                delayEnd()
                waitTxt.innerText = "..."
                waitTxt.style.padding = "20px"
                return
            }, 2500)
        }
        dino.style.height = size
        dino.style.width = size
        dino.style.gridColumnStart = spawnX
        dino.style.gridRowStart = spawnY
        dino.style.zIndex = "2"
        dino.style.left = "150px"
        dino.style.top = "150px"
    
        money -= cost
        moneyLabel.textContent = "$" + money

    }

    function destroyElement(element, cost) {
        content.removeChild(element)
        money -= cost
        moneyLabel.textContent = "$" + money
    }

    function delay() {
        waitTxt.classList.add("enabled")
        dinoBtn.classList.add("disabled")
        bigDinoBtn.classList.add("disabled")
        spinoBtn.classList.add("disabled")
        herbDinoBtn.classList.add("disabled")
        saurDinoBtn.classList.add("disabled")
        trikeBtn.classList.add("disabled")
    }
    function delayEnd() {
        waitTxt.classList.remove("enabled")
        dinoBtn.classList.remove("disabled")
        bigDinoBtn.classList.remove("disabled")
        spinoBtn.classList.remove("disabled")
        herbDinoBtn.classList.remove("disabled")
        saurDinoBtn.classList.remove("disabled")
        trikeBtn.classList.remove("disabled")
    }
    function research() {
        researchWindow.classList.toggle("enabled", researchMode)
        if (researchLevel == 1) {
            money -= 80000
        } else if (researchLevel == 2) {
            money -= 85000
        } else if (researchLevel == 3) {
            money -= 120000
        } else if (researchLevel == 4) {
            money -= 180000
        } else if (researchLevel == 5) {
            money -= 185000
        }
        researchLevel++
    }
})