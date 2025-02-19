class FunFactMachine {

  constructor(options) {
    this.options = options
    this.init()
  }

  viewed       = []
  currentIndex = null

  init = () => {
    this.container = document.createElement(this.options.tagName)
    this.container.classList.add(this.options.namespace)
    this.container.style.setProperty(
      '--animation-duration',
      `${this.options.animationDuration}ms`
    )

    this.options.parent.appendChild(this.container)

    const form = document.createElement('form')
    this.container.appendChild(form)

    const button       = document.createElement('button')
    button.type        = 'submit'
    button.textContent = this.options.prompt
    button.classList.add('fun-fact__button')
    form.appendChild(button)

    this.insertNewFact()
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.removeCurrentFact()
      this.insertNewFact()
    })

    this.container.classList.add(`${this.options.namespace}--ready`)
  }

  insertNewFact = () => {
    const index = this.nextIndex()

    const textContainer = document.createElement('p')
    textContainer.classList.add(`${this.options.namespace}__current`)

    textContainer.textContent = `${this.options.prefix} ${this.options.facts[index]}`
    this.container.insertBefore(textContainer, this.container.firstChild)

    this.currentIndex = index
    if (this.viewed.length < this.options.facts.length) {
      this.viewed.push(index)
    }

  }

  removeCurrentFact = () => {
    const textContainer = this.container.querySelector(`.${this.options.namespace}__current`)
    textContainer.classList.add(`${this.options.namespace}__previous`)
    textContainer.setAttribute('aria-hidden', true)
    setTimeout(() => {
      textContainer.remove()
    }, this.options.animationDuration)
  }

  nextIndex = () => {
    if (this.viewed.length >= this.options.facts.length) {
      return this.currentIndex === this.options.facts.length - 1 ? 0 : this.currentIndex + 1
    } else {
      return this.newRandomIndex()
    }
  }

  newRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * this.options.facts.length)
    if (this.viewed.includes(randomIndex)) {
      return this.newRandomIndex()
    } else {
      return randomIndex
    }
  }

}

new FunFactMachine({
  parent:    document.querySelector('footer'),
  tagName:   'div',
  namespace: 'fun-fact',

  animationDuration: 500,

  prefix: 'P.S.',
  prompt: 'Nog iets weten?',

  facts: [
    'Mijn favoriete dier is een vos 🦊',
    'Ik heb een hond die Abeltje heet 🐶',
    'Ik ben opgegroeid in Vlaanderen 🇧🇪',
    'Mijn moeder komt uit Schotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    'Mijn vriendin heet Ruth 🥰',
    'Ik ben fan van The Black Eyed Peas 🎵',
  ],
})