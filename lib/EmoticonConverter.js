export class EmoticonConverter {
  #emojiObjectArray
  #allEmojiObjectsWithEmoticons
  #currentEmoticon
  #currentEmoji
  #text
  #emoticonRegex

  /**
   * @param {object[]} emojiObjectArray
   */
  constructor (emojiObjectArray) {
    this.#emojiObjectArray = emojiObjectArray
    this.#allEmojiObjectsWithEmoticons = this.#getAllEmojiObjectsContainingEmoticons()
  }

  /**
   * @param {string} text
   * @returns {string}
   */
  replaceAllEmoticonsWithEmojis (text) {
    this.#text = text

    for (const emojiObject of this.#allEmojiObjectsWithEmoticons) {
      this.#checkIfPresentAndReplace(emojiObject)
    }

    return this.#text
  }

  /**
   * Checks if the emoticon belonging to the emoji object is present in text. If present, all occurrences will be replaced.
   *
   * @param {object} emojiObject
   */
  #checkIfPresentAndReplace (emojiObject) {
    this.#currentEmoji = emojiObject.emoji

    for (const emoticon of emojiObject.emoticon) {
      this.#currentEmoticon = emoticon

      this.#setEmoticonRegex() // Initialize regex for current emoticon

      const occurrences = this.#getNumberOfEmoticons()
      if (occurrences > 0) {
        this.#replaceAllWithEmoji(occurrences)
      }
    }
  }

  /**
   * @param {number} occurrences How many times the same emoticon occurs in the text.
   */
  #replaceAllWithEmoji (occurrences) {
    for (let i = 1; i <= occurrences; i++) {
      this.#text = this.#text.replace(this.#emoticonRegex, this.#currentEmoji)
    }
  }

  /**
   * @returns {object[]}
   */
  #getAllEmojiObjectsContainingEmoticons () {
    return (this.#emojiObjectArray
      .filter(element => element.emoticon))
  }

  /**
   * Counts how many times the same emoticon occurs in the text.
   *
   * @returns {number}
   */
  #getNumberOfEmoticons () {
    const matches = this.#text.match(this.#emoticonRegex)
    return matches ? matches.length : 0
  }

  /**
   * Sets the regular expression to match the current emoticon, respecting the rule
   * that emoticons must be surrounded by spaces or boundaries.
   */
  #setEmoticonRegex () {
    this.#emoticonRegex = new RegExp(`(?<!\\S)${this.#escapeRegExp(this.#currentEmoticon)}(?!\\S)`, 'g')
  }

  /**
   * Escapes special characters in the emoticon string for use in a regex.
   *
   * @param {string} emoticon
   * @returns {string}
   */
  #escapeRegExp (emoticon) {
    return emoticon.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
}
