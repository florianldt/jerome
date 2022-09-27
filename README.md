# Jerome

[![Build Status](https://github.com/florianldt/jerome/workflows/build/badge.svg)](https://github.com/florianldt/jerome/actions?query=workflow%3A%22build%22)
[![NPM Version](http://img.shields.io/npm/v/@florianldt/jerome.svg?style=flat)](https://www.npmjs.org/package/@florianldt/jerome)
[![NPM Downloads](https://img.shields.io/npm/dm/@florianldt/jerome.svg?style=flat)](https://npmcharts.com/compare/@florianldt/jerome?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=@florianldt/jerome)](https://packagephobia.now.sh/result?p=@florianldt/jerome)

Auto-localization for iOS.

Read the [Caveats](#caveats) section to learn about the currently supported translations.

-   [Jerome](#jerome)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [Example](#example)
    -   [Caveats](#caveats)
    -   [TODO](#todo)
    -   [Why Jerome?](#why-jerome%3F)
    -   [Contributions](#contributions)
    -   [Support](#support)

## Installation

```sh
npm install -g @florianldt/jerome
```

or can be executed directly using [npx](https://docs.npmjs.com/cli/v8/commands/npx):

```sh
npx @florianldt/jerome --help
```

Jerome uses [Papago](https://papago.naver.com/) to manage translations. To use Jerome, you should first create a new application on the Naver Developer Portal: https://developers.naver.com/products/papago/nmt/nmt.md

Jerome uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) to manage its configuration file.

Create the configuration file where the package is located. if you use `npm install -g @florianldt/jerome`, that should be under `~`.

ex: `~/.jeromerc.json`

```json
{
    "X_NAVER_CLIENT_ID": "<Your app Client ID>",
    "X_NAVER_CLIENT_SECRET": "<Your app Client Secret>"
}
```

## Usage

```
Usage: jerome [options]

Auto localization for iOS.

Options:
  -v, --version         output the version number
  -i, --input <path>    the base .strings file to translate
  -s, --source <local>  the local of the base .strings file (choices: "ko", "en", "zh-CN", "zh-TW", "es", "fr", "vi", "th", "id")
  -t, --target <local>  the local to translate to (choices: "ko", "en", "zh-CN", "zh-TW", "es", "fr", "vi", "th", "id")
  -h, --help            display help for command

Example calls:
  $ jerome --input ~/Localizable.strings --source ko --target en
  $ jerome -i ~/Localizable.strings -s ko -t en
  $ jerome --help
  $ jerome --version
```

## Example

![Example](https://raw.githubusercontent.com/florianldt/jerome/master/media/example.png)

## Caveats

[Papago](https://papago.naver.com/) only provides limited supported languages and the processing limit is 10,000 characters/day.

To improve translation speed, expressions are bundled together by sets of up to 5,000 characters, separated by `\n\n`. If your localization file already uses `\n\n`, issues will occur.

## TODO

-   [ ] Add the option to use either Papago or Google Translate

-   [ ] Add the possibility to translate multiple languages at the same time. ex: `--source ko --target en,fr`

-   [X] Add an optional flag to specify the output location

-   [ ] Enable auto-translation for android and more... 

## Why Jerome?

I have been living abroad for quite some time now. I experienced many local services whose applications are only available in the local language. For visitors and expats, many of those services cannot be used without the help of a native. I am not here talking about the dynamic content of the application (posts, articles, shopping items, ...) but more about the static content like buttons, settings, and more.

Translating an app to one or more languages accurately is a daunting and costly task. My objective with Jerome is for everyone to automatically localize its application instantly and for free to improve their application accessibility for people who cannot speak the local language, using the power of computing translators.

Some people may argue that computing translators are sometimes not accurate and may cause more harm than good. From my experience, computing translators have made huge progress over the years, and an inaccurate translation is still 100x better than looking at a word in a language you don't know, and perhaps even worst, in an unknown alphabet.

Also, for people and organizations localizing their services on their own, using Jerome can greatly improve speed as computing translators are quite accurate most of the time so translations can just be verified and inaccuracy fixed.

And why the name?

[Saint Jerome](https://en.wikipedia.org/wiki/Jerome) is known to be the first formal translator. He translated the Bible from Hebrew & Greek into Vulgar Latin around 400 A.D. Saint Jerome is considered the patron saint of translators, librarians, and encyclopedists.

## Contributions

If you are interested to contribute for the application, do not hesitate.

Any contribution is welcome.

## Support

If you are willing to contact me, you can either create an issue here or find me on Twitter ([@florianldt](https://twitter.com/florianldt)).
