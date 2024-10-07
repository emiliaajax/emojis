import { Helper } from './Helper.js'
import { EmojiProvider } from '../lib/EmojiProvider.js'
const emojiProvider = new EmojiProvider()
const helper = new Helper()

describe('Get all emoji objects', () => {
  test('Call to function should return an array containing all emoji objects', () => {
    expect(emojiProvider.getEmojisAndTags()).toEqual(helper.emojisAndTagsArray())
  })
})

describe('Get emojis only', () => {
  test('Call to function should return an array containing all emoji images', () => {
    expect(emojiProvider.getEmojis()).toEqual(helper.emojisOnlyArray(helper.emojisAndTagsArray()))
  })
})

describe('Get all emoji objects from given categories', () => {
  test('Passing "smileysAndEmotion" and "activity" should return only the emojis belonging to those categories', () => {
    expect(emojiProvider.getEmojisAndTagsByCategory('smileysAndEmotion', 'activity')).toEqual(helper.emojisByCategoriesArray())
  })

  test(`Passing "nonExistingCategory" should throw an error with message ${helper.ERROR_MESSAGE_NOT_VALID_CATEGORY}`, () => {
    function test () {
      emojiProvider.getEmojisAndTagsByCategory('nonExistingCategory')
    }
    expect(test).toThrowError(helper.ERROR_MESSAGE_NOT_VALID_CATEGORY)
  })
})

describe('Get emoji from tag', () => {
  test('Passing "happy-face" should return "😀"', () => {
    expect(emojiProvider.getEmojiByTag('happy-face')).toBe('😀')
  })

  test(`Passing "made-up-tag" should throw an error with message ${helper.ERROR_MESSAGE_EMOJI_NOT_EXISTING}`, () => {
    function test () {
      emojiProvider.getEmojiByTag('made-up-tag')
    }

    expect(test).toThrowError(helper.ERROR_MESSAGE_EMOJI_NOT_EXISTING)
  })
})

describe('Replace emoticons with emojis in text', () => {
  test('Passing "Hej :D" should return "Hej 😃"', () => {
    expect(emojiProvider.replaceEmoticonsWithEmojis('Hej :D')).toBe('Hej 😃')
  })

  test('Passing ":D :D :)" should be replaced with "😃 😃 😊"', () => {
    expect(emojiProvider.replaceEmoticonsWithEmojis(':D :D :)')).toBe('😃 😃 😊')
  })

  test('Passing a non-existing emoticon ":G" should not be replaced with an emoji', () => {
    expect(emojiProvider.replaceEmoticonsWithEmojis('Hej :G')).toBe('Hej :G')
  })

  test('Passing an empty string should return an empty string', () => {
    expect(emojiProvider.replaceEmoticonsWithEmojis('')).toBe('')
  })

  test('Passing "MIXDOWN" should not replace the inline emoticon "XD"', () => {
    expect(emojiProvider.replaceEmoticonsWithEmojis('MIXDOWN')).toBe('MIXDOWN')
  })
})

describe('Get emojis that matches text', () => {
  test('Passing "sad" should return [😢, 😞, 😓, 😿]', () => {
    expect(emojiProvider.getMatchingEmojis('sad')).toEqual(['😢', '😞', '😓', '😿'])
  })

  test('Passing an empty string should return an empty array', () => {
    expect(emojiProvider.getMatchingEmojis('')).toEqual([])
  })
})
