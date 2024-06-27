const config = require('../settings'),
  { cmd } = require('../lib/command'),
  { getBuffer, sleep, fetchJson } = require('../lib/functions'),
  mg = require('../lib/mg'),
  cine = require('../lib/cine')
const sinsub = require('../lib/sinsub'),
  bot = config.BOTNUMBER,
  fg = require('api-dylux'),
  axios = require('axios'),
  getFileNameFromUrl = (_0x3ccdd4) => {
    const _0x26afd7 = _0x3ccdd4.split('/'),
      _0x1f8e08 = decodeURIComponent(_0x26afd7[_0x26afd7.length - 1]),
      _0x36caf3 = _0x1f8e08.lastIndexOf('.')
    const _0xabe557 = _0x1f8e08.slice(0, _0x36caf3)
    return _0xabe557
  },
  getFileInfo = async (_0x5a753f, _0x402e09) => {
    try {
      _0x402e09 = _0x402e09 || {}
      const _0x15d0ba = { DNT: 1 }
      _0x15d0ba['Upgrade-Insecure-Request'] = 1
      const _0x5eba0b = await axios({
          method: 'head',
          url: _0x5a753f,
          headers: _0x15d0ba,
          ..._0x402e09,
        }),
        _0x5727e9 = (_0x378645) => {
          return (_0x378645 / 1073741824).toFixed(2)
        },
        _0x348d0e = parseInt(_0x5eba0b.headers['content-length']),
        _0x217a44 = _0x5727e9(_0x348d0e) + ' GB',
        _0x3eeaac = getFileNameFromUrl(_0x5a753f),
        _0x1d4f18 = {}
      return (
        (_0x1d4f18.fileSize = _0x217a44),
        (_0x1d4f18.fileName = _0x3eeaac),
        _0x1d4f18
      )
    } catch (_0x380155) {
      return console.error(_0x380155), null
    }
  }
let downloadingMovie = null
const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(_0x9efd91) {
  return String(_0x9efd91).padStart(mg.stringpadstartlimit, '0')
}
function checkSizeAndReply(_0x3b9889) {
  const _0x3f083f = config.MAX_SIZE / 1024
  if (_0x3b9889) {
    const _0x28919e = {
      GB: 1,
      MB: 0.0009765625,
      KB: 9.5367431640625e-7,
      TB: 1024,
    }
    let _0x197313 = _0x3b9889.match(/([\d.]+)\s*(GB|MB|KB|TB)/i)
    if (_0x197313) {
      const _0xa4a465 = parseFloat(_0x197313[1]),
        _0x27b998 = _0x197313[2].toUpperCase(),
        _0x46f22e = _0xa4a465 * _0x28919e[_0x27b998]
      if (_0x46f22e <= _0x3f083f && _0x46f22e < config.WHATSAPP_DEFAULT_SIZE) {
        return 'True'
      } else {
        if (_0x46f22e > 1.5) {
          return 'You can only download files smaller than 1.5GB on WhatsApp. (USING BOT)'
        } else {
          return (
            'Maximum allowed size is ' +
            _0x3f083f +
            ' GB. Please choose a smaller option.'
          )
        }
      }
    } else {
      const _0x15a5eb = parseFloat(_0x3b9889)
      if (_0x15a5eb >= 0 && _0x15a5eb <= 10) {
        const _0x23f98c = _0x15a5eb * _0x28919e.GB
        if (
          _0x23f98c <= _0x3f083f &&
          _0x23f98c < config.WHATSAPP_DEFAULT_SIZE
        ) {
          return 'True'
        } else {
          return (
            'Maximum allowed size is ' +
            _0x3f083f +
            ' GB. Please choose a smaller option.'
          )
        }
      } else {
        if (_0x15a5eb > 10 && _0x15a5eb <= 1024) {
          const _0x42affe = _0x15a5eb * _0x28919e.MB
          if (
            _0x42affe <= _0x3f083f &&
            _0x42affe < config.WHATSAPP_DEFAULT_SIZE
          ) {
            return 'True'
          } else {
            return (
              'Maximum allowed size is ' +
              _0x3f083f +
              ' GB. Please choose a smaller option.'
            )
          }
        } else {
          return 'Size format not recognized: ' + _0x3b9889
        }
      }
    }
  } else {
    return 'Request expired!! Please create new request for that movie'
  }
}
async function nosearchdetails(
  _0x1d1d19,
  _0xc15d79,
  _0x1390e5,
  _0x49fae2,
  _0x349824
) {
  let _0x1c0eca = '*' + _0x49fae2 + ' Results Not Found* \uD83E\uDD37‍\u2642️'
  return await _0x349824(_0x1c0eca)
}
const parseInput = async (_0x148cdf, _0x3571fd) => {
  let _0x1504a9, _0x27e5ef
  let _0x12dc82 = _0x148cdf.match(/[\w.-]+@[^\s]+/g) || [],
    _0x4d6ce6 = _0x148cdf
      .split(/\s+/)
      .filter((_0x53eb10) => !_0x53eb10.match(/[\w.-]+@[^\s]+/g))
  if (_0x4d6ce6.length === 0) {
    _0x1504a9 = false
  } else {
    _0x1504a9 = _0x4d6ce6.join(' ')
  }
  if (_0x12dc82.length === 0) {
    _0x12dc82.push(_0x3571fd), (_0x27e5ef = false)
  } else {
    _0x27e5ef = _0x3571fd
  }
  const _0x27505f = { input: _0x1504a9 }
  return (_0x27505f.chat = _0x12dc82), (_0x27505f.me = _0x27e5ef), _0x27505f
}
async function sea(
  _0x251f4b,
  _0x54e878,
  _0x55f5a7,
  _0x20a492,
  _0x29e4a1,
  _0x4d7a2b,
  _0x551cdc
) {
  try {
    let _0x168f5a = await fetchJson(
      '' +
        sinsub.api +
        sinsub.sinsubsearch +
        encodeURIComponent(_0x20a492) +
        '&' +
        sinsub.apikey +
        config.DEVAPIKEY
    )
    data = _0x168f5a?.movied
    const _0x1b0713 = await fetchJson(
      '' +
        cine.api +
        cine.cinesearch +
        encodeURIComponent(_0x20a492) +
        '&' +
        sinsub.apikey +
        config.DEVAPIKEY
    )
    let _0x23197b
    if (_0x4d7a2b === 'TVShow') {
      _0x23197b =
        '*\xD7-\xD7-\uD835\uDE83\uD835\uDE85 \uD835\uDE82\uD835\uDE77\uD835\uDE7E\uD835\uDE86 \uD835\uDE82\uD835\uDE74\uD835\uDE70\uD835\uDE81\uD835\uDE72\uD835\uDE77 \uD835\uDE82\uD835\uDE88\uD835\uDE82\uD835\uDE83\uD835\uDE74\uD835\uDE7C-\xD7-\xD7*\n\n'
    } else {
      if (_0x4d7a2b === 'Movie') {
        _0x23197b =
          '*\xD7-\xD7-\xD7\uD835\uDE7C\uD835\uDE7E\uD835\uDE85\uD835\uDE78\uD835\uDE74 \uD835\uDE82\uD835\uDE74\uD835\uDE70\uD835\uDE81\uD835\uDE72\uD835\uDE77 \uD835\uDE82\uD835\uDE88\uD835\uDE82\uD835\uDE83\uD835\uDE74\uD835\uDE7C\xD7-\xD7-\xD7*\n\n'
      }
    }
    let _0x483253 = '' + _0x23197b,
      _0x253fcf,
      _0x38dd91,
      _0x4e916c = [],
      _0x28c7c2
    if (_0x4d7a2b === 'TVShow') {
      _0x28c7c2 = 'tv'
    } else {
      _0x4d7a2b === 'Movie' && (_0x28c7c2 = 'mv')
    }
    if (data?.length > 0) {
      ;(_0x253fcf = data.filter(
        (_0x7ce034) =>
          _0x7ce034.type.replace(' ', '').toLowerCase().trim() ===
          _0x4d7a2b.replace(' ', '').toLowerCase().trim()
      )),
        _0x253fcf.length > 0
          ? ((_0x483253 +=
              '> \u300C Sinhalasub.lk \u300D\n\n*\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n'),
            _0x253fcf.forEach((_0x13b307, _0xc7f57e) => {
              ;(_0x483253 +=
                ' *|* ' +
                formatNumber(_0xc7f57e + 1) +
                ' *|\u276E* ' +
                _0x13b307.title +
                '\n'),
                _0x4e916c.push(
                  '.' + _0x28c7c2 + ' ' + _0x13b307.link + ' ' + _0x551cdc
                )
            }))
          : (_0x483253 +=
              '> \u300C Sinhalasub.lk \u300D\n\n*\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
              ('*|* No ' + _0x4d7a2b + 's found for this on Sinhalasub.lk') +
              '\n')
    } else {
      _0x483253 +=
        '> \u300C Sinhalasub.lk \u300D\n\n*\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
        ('*|* No ' + _0x4d7a2b + 's found for this on Sinhalasub.lk') +
        '\n'
    }
    _0x483253 +=
      '*\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n\n'
    if (_0x1b0713?.data?.data?.data?.length > 0) {
      const _0x407349 = _0x253fcf.length + 1
      _0x38dd91 = _0x1b0713.data.data.data.filter(
        (_0xac05f5) =>
          _0xac05f5.type.replace(' ', '').toLowerCase().trim() ===
          _0x4d7a2b.replace(' ', '').toLowerCase().trim()
      )
      _0x38dd91 && _0x38dd91.length > 0
        ? ((_0x483253 +=
            '> \u300C Cinesubz.co \u300D\n\n*\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n'),
          _0x38dd91.forEach((_0x3416d7, _0x2269e8) => {
            ;(_0x483253 +=
              ' *|* ' +
              formatNumber(_0x407349 + _0x2269e8) +
              ' *|\u276E* ' +
              _0x3416d7.title +
              '\n'),
              _0x4e916c.push(
                '.' + _0x28c7c2 + ' ' + _0x3416d7.link + ' ' + _0x551cdc
              )
          }))
        : (_0x483253 +=
            '> \u300C Cinesubz.co \u300D\n\n*\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
            ('*|* No ' + _0x4d7a2b + 's found for this on cinesubz.co') +
            '\n')
    } else {
      _0x483253 +=
        '> \u300C Cinesubz.co \u300D\n\n*\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
        ('*|* No ' + _0x4d7a2b + 's found for this on cinesubz.co') +
        '\n'
    }
    _0x483253 +=
      '*\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n\n'
    _0x483253 += '' + config.FOOTERNAME
    if (
      (_0x253fcf && _0x253fcf.length > 0) ||
      (_0x38dd91 && _0x38dd91.length > 0)
    ) {
      const _0x11a980 = _0x55f5a7?.key?.remoteJid,
        _0x4b358a = await getBuffer(config.imagesearch),
        _0x4ee906 = {
          image: _0x4b358a,
          caption: _0x483253,
        }
      const _0x1a261a = { quoted: _0x55f5a7 }
      const _0x3b1a7c = await _0x251f4b.sendMessage(
          _0x11a980,
          _0x4ee906,
          _0x1a261a
        ),
        _0x5b4e6f = {
          key: _0x3b1a7c.key,
          numrep: _0x4e916c,
          method: 'nondecimal',
        }
      const _0x1e371c = _0x5b4e6f
      await storenumrepdata(_0x1e371c)
      const _0xc46b6f = {
        text: '\uD83D\uDCDC',
        key: _0x3b1a7c.key,
      }
      const _0x2da7aa = { react: _0xc46b6f }
      await _0x251f4b.sendMessage(_0x11a980, _0x2da7aa)
      await sleep(1000)
    } else {
      const _0x327f63 = _0x55f5a7?.key?.remoteJid
      await nosearchdetails(
        _0x251f4b,
        _0x327f63,
        _0x55f5a7,
        _0x4d7a2b,
        _0x29e4a1
      )
    }
  } catch (_0x2bcac7) {
    console.log(_0x2bcac7)
  }
}
async function movi(
  _0x5231bb,
  _0x294fd3,
  _0x9f94d0,
  _0x2c7f24,
  _0xa28ab8,
  _0x4775a3
) {
  if (_0x2c7f24.startsWith(cine.site)) {
    const _0x4375f2 = await fetchJson(
      '' +
        cine.api +
        cine.cinemovie +
        _0x2c7f24 +
        '&' +
        sinsub.apikey +
        config.DEVAPIKEY
    )
    if (_0x4375f2?.result?.data) {
      const _0x257099 = _0x4375f2.result.data,
        _0x4ff6f7 = _0x257099?.mainDetails?.maintitle,
        _0x494cb5 = _0x257099?.mainDetails?.dateCreated,
        _0x585eb7 = _0x257099?.mainDetails?.country,
        _0x4f657b = _0x257099?.mainDetails?.runtime,
        _0x5ca77b = _0x257099?.moviedata?.director
      let _0x1659b9 =
          '*\xD7-\xD7-\xD7\uD835\uDE7C\uD835\uDE7E\uD835\uDE85\uD835\uDE78\uD835\uDE74 \uD835\uDE73\uD835\uDE7E\uD835\uDE86\uD835\uDE7D\uD835\uDE7B\uD835\uDE7E\uD835\uDE70\uD835\uDE73\uD835\uDE74\uD835\uDE81\xD7-\xD7-\xD7*\n\n*\u256D\u2500\u2500\u2500\u300C ᴍᴏᴠɪᴇ-ɪɴꜰᴏ \u300D\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
          (' *|* *\u2B55 : ' + _0x4ff6f7 + '*') +
          '\n' +
          (' *|* *\uD83D\uDCC6 \uD835\uDE81\uD835\uDE8E\uD835\uDE95\uD835\uDE8E\uD835\uDE8A\uD835\uDE9C\uD835\uDE8E \uD835\uDE73\uD835\uDE8A\uD835\uDE9D\uD835\uDE8E : ' +
            _0x494cb5 +
            '*') +
          '\n' +
          (' *|* *\uD83C\uDF0E \uD835\uDE72\uD835\uDE98\uD835\uDE9E\uD835\uDE97\uD835\uDE9D\uD835\uDE9B\uD835\uDEA2 : ' +
            _0x585eb7 +
            '*') +
          '\n' +
          (' *|* *\uD83D\uDD87️ \uD835\uDE7C\uD835\uDE98\uD835\uDE9F\uD835\uDE92\uD835\uDE8E :* ' +
            _0x2c7f24) +
          '\n' +
          (' *|* *\u23F0 \uD835\uDE81\uD835\uDE9E\uD835\uDE97 \uD835\uDE83\uD835\uDE92\uD835\uDE96\uD835\uDE8E : ' +
            _0x4f657b +
            '*') +
          '\n' +
          (' *|* *\uD83C\uDFA5 \uD835\uDE73\uD835\uDE92\uD835\uDE9B\uD835\uDE8E\uD835\uDE8C\uD835\uDE9D\uD835\uDE98\uD835\uDE9B : ' +
            _0x5ca77b +
            '*') +
          '\n' +
          '*\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*' +
          '\n' +
          '\n' +
          '*Please select the quality you wants to download by replying these numbers.*' +
          '\n' +
          '\n' +
          ('*' + formatNumber(1) + ' |\u276E* Informations') +
          '\n' +
          ('*' + formatNumber(2) + ' |\u276E* Images') +
          '\n' +
          '\n',
        _0x5c8f43 = []
      _0x5c8f43.push('.mvinfo ' + _0x2c7f24 + ' ' + _0x4775a3)
      _0x5c8f43.push('.mvimages ' + _0x2c7f24 + ' ' + _0x4775a3)
      const _0x495b22 = _0x257099?.mainDetails?.imageUrl
          ? config.IMAGE_ENHANCE + _0x257099?.mainDetails?.imageUrl
          : mg.imagenotfound,
        _0x770025 = _0x257099?.dllinks.directDownloadLinks
      _0x770025.forEach((_0x344d2c, _0x258d35) => {
        ;(_0x1659b9 +=
          '*' +
          formatNumber(_0x258d35 + 3) +
          ' |\u276E* ' +
          _0x344d2c.quality +
          ' (' +
          _0x344d2c.size +
          ')' +
          '\n'),
          _0x5c8f43.push('.dlmovie ' + _0x344d2c.link + ' ' + _0x4775a3)
      })
      _0x1659b9 += '\n' + ('' + config.FOOTERNAME)
      const _0x1c2930 = _0x9f94d0?.key?.remoteJid,
        _0x2a8cfe = await getBuffer(_0x495b22),
        _0x10c9e4 = {
          image: _0x2a8cfe,
          caption: _0x1659b9,
        }
      const _0x2606a8 = { quoted: _0x9f94d0 }
      const _0x2294f1 = await _0x5231bb.sendMessage(
          _0x1c2930,
          _0x10c9e4,
          _0x2606a8
        ),
        _0x58bc97 = {
          key: _0x2294f1.key,
          numrep: _0x5c8f43,
          method: 'nondecimal',
        }
      const _0x3db251 = _0x58bc97
      await storenumrepdata(_0x3db251)
      const _0x417958 = {
        text: '\uD83D\uDCDC',
        key: _0x2294f1.key,
      }
      const _0x244c68 = {}
      return (
        (_0x244c68.react = _0x417958),
        await _0x5231bb.sendMessage(_0x1c2930, _0x244c68),
        await sleep(1000),
        true
      )
    } else {
      const _0x51f5c9 = _0x9f94d0?.key?.remoteJid
      await nosearchdetails(_0x5231bb, _0x51f5c9, _0x9f94d0, 'Movie', _0xa28ab8)
    }
  } else {
    if (_0x2c7f24.startsWith(sinsub.site)) {
      const _0x505799 = await fetchJson(
          '' +
            sinsub.api +
            sinsub.sinsubmovie +
            _0x2c7f24 +
            '&' +
            sinsub.apikey +
            config.DEVAPIKEY
        ),
        _0x4097f6 = _0x505799.movied
      if (_0x4097f6) {
        const _0x4b6d10 = _0x4097f6.title,
          _0x54dd21 = _0x4097f6.runtime,
          _0x1913bc = _0x4097f6.date,
          _0x2820be = _0x4097f6.imageUrls,
          _0x2956c2 = _0x2820be[0]
            ? config.IMAGE_ENHANCE + _0x2820be[0]
            : mg.imagenotfound,
          _0x327bab = _0x4097f6.country
        let _0x32ca00 = _0x4097f6.cast.find(
            (_0x3e3e0e) => _0x3e3e0e.character === 'Director'
          )
            ? _0x4097f6.cast.find(
                (_0x1f9b8a) => _0x1f9b8a.character === 'Director'
              ).actorName
            : 'No Information',
          _0x12d4fe = []
        if (_0x4097f6.links) {
          _0x12d4fe = _0x4097f6.links?.download
        } else {
          _0x4097f6.dl && (_0x12d4fe = _0x4097f6.dl)
        }
        let _0x1e84fa =
            '*\xD7-\xD7-\xD7\uD835\uDE7C\uD835\uDE7E\uD835\uDE85\uD835\uDE78\uD835\uDE74 \uD835\uDE73\uD835\uDE7E\uD835\uDE86\uD835\uDE7D\uD835\uDE7B\uD835\uDE7E\uD835\uDE70\uD835\uDE73\uD835\uDE74\uD835\uDE81\xD7-\xD7-\xD7*\n\n*\u256D\u2500\u2500\u2500\u300C ᴍᴏᴠɪᴇ-ɪɴꜰᴏ \u300D\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
            (' *|* *\u2B55 : ' + _0x4b6d10 + '*') +
            '\n' +
            (' *|* *\uD83D\uDCC6 \uD835\uDE81\uD835\uDE8E\uD835\uDE95\uD835\uDE8E\uD835\uDE8A\uD835\uDE9C\uD835\uDE8E \uD835\uDE73\uD835\uDE8A\uD835\uDE9D\uD835\uDE8E : ' +
              _0x1913bc +
              '*') +
            '\n' +
            (' *|* *\uD83C\uDF0E \uD835\uDE72\uD835\uDE98\uD835\uDE9E\uD835\uDE97\uD835\uDE9D\uD835\uDE9B\uD835\uDEA2 : ' +
              _0x327bab +
              '*') +
            '\n' +
            (' *|* *\uD83D\uDD87️ \uD835\uDE7C\uD835\uDE98\uD835\uDE9F\uD835\uDE92\uD835\uDE8E :* ' +
              _0x2c7f24) +
            '\n' +
            (' *|* *\u23F0 \uD835\uDE81\uD835\uDE9E\uD835\uDE97 \uD835\uDE83\uD835\uDE92\uD835\uDE96\uD835\uDE8E : ' +
              _0x54dd21 +
              '*') +
            '\n' +
            (' *|* *\uD83C\uDFA5 \uD835\uDE73\uD835\uDE92\uD835\uDE9B\uD835\uDE8E\uD835\uDE8C\uD835\uDE9D\uD835\uDE98\uD835\uDE9B : ' +
              _0x32ca00 +
              '*') +
            '\n' +
            '*\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*' +
            '\n' +
            '\n' +
            '\n' +
            '*Please select the quality you wants to download by replying these numbers.*' +
            '\n' +
            '\n' +
            ('*' + formatNumber(1) + ' |\u276E* Informations') +
            '\n' +
            ('*' + formatNumber(2) + ' |\u276E* Images') +
            '\n' +
            '\n',
          _0x1bd697 = []
        _0x1bd697.push('.mvinfo ' + _0x2c7f24 + ' ' + _0x4775a3)
        _0x1bd697.push('.mvimages ' + _0x2c7f24 + ' ' + _0x4775a3)
        _0x12d4fe &&
          _0x12d4fe?.length > 0 &&
          _0x12d4fe.forEach((_0x58505a, _0x59b4a0) => {
            _0x58505a &&
              _0x58505a.link &&
              ((_0x1e84fa +=
                '*' +
                formatNumber(_0x59b4a0 + 3) +
                ' |\u276E* ' +
                _0x58505a.quality +
                ' (' +
                _0x58505a.size +
                ')' +
                '\n'),
              _0x1bd697.push('.dlmovie ' + _0x58505a.link + ' ' + _0x4775a3))
          })
        _0x1e84fa += '\n' + ('' + config.FOOTERNAME)
        const _0x35b449 = _0x9f94d0?.key?.remoteJid,
          _0xfc0e5d = await getBuffer(_0x2956c2),
          _0x1cc91c = {
            image: _0xfc0e5d,
            caption: _0x1e84fa,
          }
        const _0x25934b = { quoted: _0x9f94d0 }
        const _0x46443f = await _0x5231bb.sendMessage(
            _0x35b449,
            _0x1cc91c,
            _0x25934b
          ),
          _0xb7e0f0 = {
            key: _0x46443f.key,
            numrep: _0x1bd697,
            method: 'nondecimal',
          }
        const _0x294caa = _0xb7e0f0
        await storenumrepdata(_0x294caa)
        const _0x28b813 = {
          text: '\uD83D\uDCDC',
          key: _0x46443f.key,
        }
        const _0x3afc1e = {}
        return (
          (_0x3afc1e.react = _0x28b813),
          await _0x5231bb.sendMessage(_0x35b449, _0x3afc1e),
          await sleep(1000),
          true
        )
      } else {
        const _0x5d5c7d = _0x9f94d0?.key?.remoteJid
        await nosearchdetails(
          _0x5231bb,
          _0x5d5c7d,
          _0x9f94d0,
          'Movie',
          _0xa28ab8
        )
      }
    }
  }
}
function convertToHoursAndMinutes(_0xf9f96d) {
  const _0x5b4a07 = Math.floor(_0xf9f96d / 60)
  const _0x5a0cf4 = _0xf9f96d % 60
  return _0x5b4a07 + 'h ' + _0x5a0cf4 + 'm'
}
async function sendinfo(
  _0x4ac385,
  _0x4ea5ed,
  _0x19154b,
  _0xfece5e,
  _0x316c1d,
  _0x1748c4
) {
  if (_0x1748c4.startsWith(cine.site)) {
    if (_0xfece5e === 'tvshow') {
      const _0x2c27a6 = await fetchJson(
          '' + cine.api + cine.cinetvshow + _0x1748c4
        ),
        _0x14086f = _0x2c27a6.result.data.mainDetails,
        _0x499723 = _0x2c27a6.result.data.moviedata,
        _0x4d558c = _0x499723.castDetails.cast
          .map((_0x5be02a) => _0x5be02a.actor.name)
          .join(', '),
        _0x1c7859 =
          '\u2618️ *Tιтle :' +
          _0x14086f.maintitle +
          '*' +
          '\n' +
          '\n' +
          ('\uD83D\uDCD5 *Gᴇɴʀᴇs \u27A0 ' + _0x14086f.genres.join(', ') + '*') +
          '\n' +
          '\uD83D\uDCD6 *Sᴜʙᴛɪᴛʟᴇ \u27A0 Sinhala*' +
          '\n' +
          ('\uD83C\uDFA5 *Dɪʀᴇᴄᴛᴏʀ \u27A0 ' +
            _0x499723.castDetails.creator.name +
            '*') +
          '\n' +
          ('\uD83D\uDC83 *Cᴀꜱᴛ \u27A0 ' + _0x4d558c + '*') +
          '\n' +
          '\n' +
          ('' + config.FOOTERNAME),
        _0x19ff35 = _0x14086f?.imageUrl ? _0x14086f.imageUrl : mg.imagenotfound,
        _0x101e91 = _0x19154b?.key?.remoteJid
      if (_0x4ea5ed?.length === 1 && _0x4ea5ed[0] === _0x101e91) {
        const _0x33fd9f = { url: _0x19ff35 }
        const _0x295ceb = {
          image: _0x33fd9f,
          caption: _0x1c7859,
        }
        const _0x150f65 = { quoted: _0x19154b }
        const _0x2664ba = await _0x4ac385.sendMessage(
            _0x101e91,
            _0x295ceb,
            _0x150f65
          ),
          _0x472bd8 = {
            text: '\uD83D\uDCFD️',
            key: _0x2664ba.key,
          }
        const _0x25b6a0 = { react: _0x472bd8 }
        await _0x4ac385.sendMessage(_0x101e91, _0x25b6a0)
      } else {
        await Promise.all(
          _0x4ea5ed.map(async (_0x10618d) => {
            const _0xc83196 = { url: _0x19ff35 }
            const _0x11a276 = {
              image: _0xc83196,
              caption: _0x1c7859,
            }
            const _0x1c3063 = await _0x4ac385.sendMessage(_0x10618d, _0x11a276),
              _0x31089b = {
                text: '\uD83D\uDCFD️',
                key: _0x1c3063.key,
              }
            const _0x571be2 = { react: _0x31089b }
            await _0x4ac385.sendMessage(_0x10618d, _0x571be2)
          })
        )
      }
    } else {
      if (_0xfece5e === 'movie') {
        const _0x49e274 = await fetchJson(
            '' + cine.api + cine.cinemovie + _0x1748c4
          ),
          _0x261a28 = _0x49e274.result.data,
          _0x2f40b8 = _0x261a28.moviedata.cast
            .map((_0x27c58b) => '' + _0x27c58b.name)
            .join(', '),
          _0x26b49c =
            '\u2618️ *Tιтle :' +
            _0x261a28.mainDetails.maintitle +
            '*' +
            '\n' +
            '\n' +
            ('\uD83C\uDF0E *Cᴏᴜɴᴛʀʏ \u27A0 ' +
              _0x261a28.mainDetails.country +
              '*') +
            '\n' +
            ('\uD83D\uDCC6 *Rᴇʟᴇᴀꜱᴇ \u27A0 ' +
              _0x261a28.mainDetails.dateCreated +
              '*') +
            '\n' +
            ('\uD83D\uDCD5 *Gᴇɴʀᴇs \u27A0 ' +
              _0x261a28.mainDetails.genres.join(', ') +
              '*') +
            '\n' +
            '\uD83D\uDCD6 *Sᴜʙᴛɪᴛʟᴇ \u27A0 Sinhala*' +
            '\n' +
            ('\u23F0 *Rᴜɴᴛɪᴍᴇ \u27A0 ' +
              convertToHoursAndMinutes(
                parseInt(_0x261a28.mainDetails.runtime)
              ) +
              '*') +
            '\n' +
            '\n' +
            ('\uD83D\uDC83 *Cᴀꜱᴛ \u27A0 ' + _0x2f40b8 + '*') +
            '\n' +
            '\n' +
            ('' + config.FOOTERNAME),
          _0x143dbf = _0x261a28?.mainDetails?.imageUrl
            ? _0x261a28.mainDetails.imageUrl
            : mg.imagenotfound,
          _0x13ee02 = _0x19154b?.key?.remoteJid
        if (_0x4ea5ed?.length === 1 && _0x4ea5ed[0] === _0x13ee02) {
          const _0x3b027a = { url: _0x143dbf }
          const _0x2380d2 = {
            image: _0x3b027a,
            caption: _0x26b49c,
          }
          const _0x3b6f95 = { quoted: _0x19154b }
          const _0x450b38 = await _0x4ac385.sendMessage(
              _0x13ee02,
              _0x2380d2,
              _0x3b6f95
            ),
            _0x5c422e = {
              text: '\uD83D\uDCFD️',
              key: _0x450b38.key,
            }
          const _0x23454e = { react: _0x5c422e }
          await _0x4ac385.sendMessage(_0x13ee02, _0x23454e)
        } else {
          await Promise.all(
            _0x4ea5ed.map(async (_0x9a5606) => {
              const _0x1a9453 = { url: _0x143dbf }
              const _0x1a3f53 = {
                image: _0x1a9453,
                caption: _0x26b49c,
              }
              const _0x53f890 = await _0x4ac385.sendMessage(
                  _0x9a5606,
                  _0x1a3f53
                ),
                _0x3213a6 = {
                  text: '\uD83D\uDCFD️',
                  key: _0x53f890.key,
                }
              const _0x5b5c91 = { react: _0x3213a6 }
              await _0x4ac385.sendMessage(_0x9a5606, _0x5b5c91)
            })
          )
        }
      }
    }
  } else {
    if (_0x1748c4.startsWith(sinsub.site)) {
      if (_0xfece5e === 'tvshow') {
        let _0x363a4e = await fetchJson(
          '' +
            sinsub.api +
            sinsub.sinsubtvshow +
            _0x1748c4 +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        _0x363a4e = _0x363a4e.movied
        const _0x48ac97 = _0x363a4e,
          _0x2d75cf = _0x48ac97.cast
            .map((_0xc3d0c3) => _0xc3d0c3.actorName)
            .join(', '),
          _0x479805 =
            '\u2618️ *Tιтle :' +
            _0x48ac97.title +
            '*' +
            '\n' +
            '\n' +
            ('\uD83C\uDFA5 *Dɪʀᴇᴄᴛᴏʀ \u27A0 ' +
              _0x48ac97.cast[0].actorName +
              '*') +
            '\n' +
            '\uD83D\uDCD6 *Sᴜʙᴛɪᴛʟᴇ \u27A0 Sinhala*' +
            '\n' +
            ('\uD83D\uDC83 *Cᴀꜱᴛ \u27A0 ' + _0x2d75cf + '*') +
            '\n' +
            '\n' +
            ('' + config.FOOTERNAME),
          _0x1789da = _0x48ac97?.imageURLs[0]
            ? config.IMAGE_ENHANCE +
              _0x48ac97.imageURLs[0].replace('/w300/', '/original/')
            : mg.imagenotfound,
          _0x5a1958 = _0x19154b?.key?.remoteJid
        if (_0x4ea5ed?.length === 1 && _0x4ea5ed[0] === _0x5a1958) {
          const _0x426bec = { url: _0x1789da }
          const _0x168d25 = {
            image: _0x426bec,
            caption: _0x479805,
          }
          const _0x5924ff = { quoted: _0x19154b }
          const _0x279813 = await _0x4ac385.sendMessage(
              _0x5a1958,
              _0x168d25,
              _0x5924ff
            ),
            _0x4425c4 = {
              text: '\uD83D\uDCFD️',
              key: _0x279813.key,
            }
          const _0x307759 = { react: _0x4425c4 }
          await _0x4ac385.sendMessage(_0x5a1958, _0x307759)
        } else {
          await Promise.all(
            _0x4ea5ed.map(async (_0x7f86d3) => {
              const _0x13ebc2 = { url: _0x1789da }
              const _0xf97e43 = {
                image: _0x13ebc2,
                caption: _0x479805,
              }
              const _0x370233 = await _0x4ac385.sendMessage(
                  _0x7f86d3,
                  _0xf97e43
                ),
                _0x5780b7 = {
                  text: '\uD83D\uDCFD️',
                  key: _0x370233.key,
                }
              const _0x9fba30 = { react: _0x5780b7 }
              await _0x4ac385.sendMessage(_0x7f86d3, _0x9fba30)
            })
          )
        }
      } else {
        if (_0xfece5e === 'movie') {
          let _0x30064f = await fetchJson(
            '' +
              sinsub.api +
              sinsub.sinsubmovie +
              _0x1748c4 +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          _0x30064f = _0x30064f.movied
          const _0x4cc241 = _0x30064f,
            _0x47479b = _0x4cc241.cast
              .map((_0x1e9d19) => '' + _0x1e9d19.actorName)
              .join(', '),
            _0x111649 = _0x4cc241.imageUrls,
            _0x54c38a =
              '\u2618️ *Tιтle :' +
              _0x4cc241.title +
              '*' +
              '\n' +
              '\n' +
              ('\uD83C\uDF0E *Cᴏᴜɴᴛʀʏ \u27A0 ' + _0x4cc241.country + '*') +
              '\n' +
              ('\uD83D\uDCC6 *Rᴇʟᴇᴀꜱᴇ \u27A0 ' + _0x4cc241.date + '*') +
              '\n' +
              '\uD83D\uDCD6 *Sᴜʙᴛɪᴛʟᴇ \u27A0 Sinhala*' +
              '\n' +
              ('\uD83D\uDCD5 *Gᴇɴʀᴇs \u27A0 ' +
                _0x4cc241.genres.join(', ') +
                '*') +
              '\n' +
              ('\u23F0 *Rᴜɴᴛɪᴍᴇ \u27A0 ' +
                convertToHoursAndMinutes(parseInt(_0x4cc241.runtime)) +
                '*') +
              '\n' +
              ('\uD83C\uDFA5 *Dɪʀᴇᴄᴛᴏʀ \u27A0 ' +
                _0x4cc241.cast[0].actorName +
                '*') +
              '\n' +
              '\n' +
              ('\uD83D\uDC83 *Cᴀꜱᴛ \u27A0 ' + _0x47479b + '*') +
              '\n' +
              '\n' +
              ('' + config.FOOTERNAME),
            _0x5d2bc0 = _0x111649[0]
              ? config.IMAGE_ENHANCE + _0x111649[0]
              : mg.imagenotfound,
            _0x53a473 = _0x19154b?.key?.remoteJid
          if (_0x4ea5ed?.length === 1 && _0x4ea5ed[0] === _0x53a473) {
            const _0x36c231 = { url: _0x5d2bc0 }
            const _0x46f614 = {
              image: _0x36c231,
              caption: _0x54c38a,
            }
            const _0x554cf2 = { quoted: _0x19154b }
            const _0x3e2966 = await _0x4ac385.sendMessage(
                _0x53a473,
                _0x46f614,
                _0x554cf2
              ),
              _0x3b44a4 = {
                text: '\uD83D\uDCFD️',
                key: _0x3e2966.key,
              }
            const _0x5a0528 = { react: _0x3b44a4 }
            await _0x4ac385.sendMessage(_0x53a473, _0x5a0528)
          } else {
            await Promise.all(
              _0x4ea5ed.map(async (_0xc3a54c) => {
                const _0x4d1467 = { url: _0x5d2bc0 }
                const _0x439279 = {
                  image: _0x4d1467,
                  caption: _0x54c38a,
                }
                const _0x47cec6 = await _0x4ac385.sendMessage(
                    _0xc3a54c,
                    _0x439279
                  ),
                  _0x106aea = {
                    text: '\uD83D\uDCFD️',
                    key: _0x47cec6.key,
                  }
                const _0xa51cd0 = { react: _0x106aea }
                await _0x4ac385.sendMessage(_0xc3a54c, _0xa51cd0)
              })
            )
          }
        }
      }
    }
  }
}
async function tvsh(
  _0x576bd1,
  _0x35b138,
  _0x59b5cc,
  _0x130b75,
  _0x11aa01,
  _0xb13023
) {
  let _0x194ae6 = []
  if (_0x130b75.startsWith(cine.site)) {
    const _0x41a656 = await fetchJson(
      '' +
        cine.api +
        cine.cinetvshow +
        _0x130b75 +
        '&' +
        sinsub.apikey +
        config.DEVAPIKEY
    )
    if (_0x41a656?.result?.data) {
      const _0x1912d4 = _0x41a656.result.data,
        _0x1a10f1 = _0x1912d4?.mainDetails,
        _0x1ba8d3 = _0x1912d4?.episodesDetails,
        _0x311310 = _0x1a10f1?.imageUrl
          ? config.IMAGE_ENHANCE + _0x1a10f1?.imageUrl
          : mg.imagenotfound,
        _0x214a6d = _0x1a10f1?.maintitle,
        _0x2f68c0 = _0x1ba8d3?.length,
        _0x3bdab8 = _0x1ba8d3
          .map((_0x109a2b, _0x1523a5) => {
            const _0x5a4016 = formatNumber(_0x1523a5 + 1),
              _0x314842 = formatNumber(_0x1523a5 + 2)
            _0x194ae6.push(
              _0x1523a5 + 2 + '.1 .allepies ' + _0x130b75 + ' ' + _0xb13023
            )
            const _0x5a4c48 = _0x109a2b.episodes
              .map((_0x4a6dc8) => {
                const _0x145851 = _0x4a6dc8.number.split(' - '),
                  _0x1d6372 =
                    formatNumber(parseInt(_0x145851[0].trim()) + 1) +
                    '.' +
                    formatNumber(parseInt(parseInt(_0x145851[1].trim()) + 1))
                return (
                  _0x194ae6.push(
                    parseInt(_0x145851[0].trim()) +
                      1 +
                      '.' +
                      parseInt(parseInt(_0x145851[1].trim()) + 1) +
                      ' .ep ' +
                      _0x4a6dc8.url +
                      ' ' +
                      _0xb13023
                  ),
                  '*' + _0x1d6372 + ' |\u276E* ' + _0x4a6dc8.title
                )
              })
              .join('\n')
            return (
              '> *\u2500\u2500\u300C Season ' +
              _0x5a4016 +
              ' \u300D\u2500\u2500*' +
              '\n' +
              ('*' + _0x314842 + '.01 |\u276E* All Episodes') +
              '\n' +
              ('' + _0x5a4c48) +
              '\n'
            )
          })
          .join('\n'),
        _0x55dedd =
          '*\xD7-\xD7-\xD7\uD835\uDE83\uD835\uDE85 \uD835\uDE82\uD835\uDE77\uD835\uDE7E\uD835\uDE86 \uD835\uDE73\uD835\uDE7E\uD835\uDE86\uD835\uDE7D\uD835\uDE7B\uD835\uDE7E\uD835\uDE70\uD835\uDE73\uD835\uDE74\uD835\uDE81\xD7-\xD7-\xD7*\n\n*\u256D\u2500\u2500\u2500\u300C ᴛᴠ ꜱʜᴏᴡ ɪɴꜰᴏ \u300D\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
          (' *|* *\u2B55 :* ' + _0x214a6d) +
          '\n' +
          (' *|* *\uD83D\uDCCC \uD835\uDE82\uD835\uDE8E\uD835\uDE8A\uD835\uDE9C\uD835\uDE98\uD835\uDE97\uD835\uDE9C :* ' +
            _0x2f68c0) +
          '\n' +
          (' *|* *\uD83D\uDD87️ \uD835\uDE83\uD835\uDE9F\uD835\uDE82\uD835\uDE91\uD835\uDE98\uD835\uDEA0 :* ' +
            _0x130b75) +
          '\n' +
          '*\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*' +
          '\n' +
          '\n' +
          '*Please select the episodes you want to download by replying these numbers*' +
          '\n' +
          '\n' +
          '*01.01 |\u276E* Informations' +
          '\n' +
          '*01.02 |\u276E* Images' +
          '\n' +
          '\n' +
          ('' + _0x3bdab8) +
          '\n' +
          ('' + config.FOOTERNAME)
      _0x194ae6.push('1.1 .mvinfo ' + _0x130b75 + ' ' + _0xb13023)
      _0x194ae6.push('1.2 .mvimages ' + _0x130b75 + ' ' + _0xb13023)
      const _0xf463b3 = _0x59b5cc?.key?.remoteJid,
        _0x57c57e = await getBuffer(_0x311310),
        _0x5a4ca0 = {
          image: _0x57c57e,
          caption: _0x55dedd,
        }
      const _0x2d44f6 = { quoted: _0x59b5cc }
      const _0x50c7de = await _0x576bd1.sendMessage(
          _0xf463b3,
          _0x5a4ca0,
          _0x2d44f6
        ),
        _0x3ced77 = {
          key: _0x50c7de.key,
          numrep: _0x194ae6,
          method: 'decimal',
        }
      const _0x12c5e1 = _0x3ced77
      await storenumrepdata(_0x12c5e1)
      const _0x58e734 = {
        text: '\uD83D\uDCDC',
        key: _0x50c7de.key,
      }
      const _0x506cd4 = {}
      return (
        (_0x506cd4.react = _0x58e734),
        await _0x576bd1.sendMessage(_0xf463b3, _0x506cd4),
        await sleep(1000),
        true
      )
    } else {
      return (
        await nosearchdetails(
          _0x576bd1,
          _0x35b138,
          _0x59b5cc,
          'TV Show',
          _0x11aa01
        ),
        true
      )
    }
  } else {
    if (_0x130b75.startsWith(sinsub.site)) {
      const _0x30e9a8 = await fetchJson(
          '' +
            sinsub.api +
            sinsub.sinsubtvshow +
            _0x130b75 +
            '&' +
            sinsub.apikey +
            config.DEVAPIKEY
        ),
        _0x2186e5 = _0x30e9a8.movied
      if (_0x2186e5) {
        function _0x23676b(_0x501473) {
          const _0x3ef2c0 = _0x501473.number.split(' - '),
            _0x4fba56 =
              formatNumber(parseInt(_0x3ef2c0[0].trim()) + 1) +
              '.' +
              formatNumber(parseInt(parseInt(_0x3ef2c0[1].trim()) + 1))
          return (
            _0x194ae6.push(
              parseInt(_0x3ef2c0[0].trim()) +
                1 +
                '.' +
                parseInt(parseInt(_0x3ef2c0[1].trim()) + 1) +
                ' .ep ' +
                _0x501473.link +
                ' ' +
                _0xb13023
            ),
            '*' + _0x4fba56 + ' |\u276E* ' + _0x501473.title
          )
        }
        function _0x2fa347(_0x5a8e02, _0x2edcb4) {
          const _0x2412cb = _0x5a8e02.episodes.map(_0x23676b).join('\n'),
            _0x7a544a = formatNumber(_0x2edcb4 + 1),
            _0x4ddc41 = formatNumber(_0x2edcb4 + 2)
          return (
            _0x194ae6.push(
              _0x2edcb4 + 2 + '.1 .allepies ' + _0x130b75 + ' ' + _0xb13023
            ),
            '> *\u2500\u2500\u300C Season ' +
              _0x7a544a +
              ' \u300D\u2500\u2500*' +
              '\n' +
              ('*' + _0x4ddc41 + '.01 |\u276E* All Episodes') +
              '\n' +
              ('' + _0x2412cb) +
              '\n'
          )
        }
        function _0x508a23(_0x3f0e66) {
          const _0x41ce22 = _0x3f0e66.seasons.map(_0x2fa347).join('\n'),
            _0x54d144 = _0x3f0e66.title,
            _0x20377a = _0x3f0e66.seasonsCount
          return (
            _0x194ae6.push('1.1 .mvinfo ' + _0x130b75 + ' ' + _0xb13023),
            _0x194ae6.push('1.2 .mvimages ' + _0x130b75 + ' ' + _0xb13023),
            '*\xD7-\xD7-\xD7\uD835\uDE83\uD835\uDE85 \uD835\uDE82\uD835\uDE77\uD835\uDE7E\uD835\uDE86 \uD835\uDE73\uD835\uDE7E\uD835\uDE86\uD835\uDE7D\uD835\uDE7B\uD835\uDE7E\uD835\uDE70\uD835\uDE73\uD835\uDE74\uD835\uDE81\xD7-\xD7-\xD7*\n\n*\u256D\u2500\u2500\u2500\u300C ᴛᴠ ꜱʜᴏᴡ ɪɴꜰᴏ \u300D\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
              (' *|* *\u2B55 :* ' + _0x54d144) +
              '\n' +
              (' *|* *\uD83D\uDCCC \uD835\uDE82\uD835\uDE8E\uD835\uDE8A\uD835\uDE9C\uD835\uDE98\uD835\uDE97\uD835\uDE9C :* ' +
                _0x20377a) +
              '\n' +
              (' *|* *\uD83D\uDD87️ \uD835\uDE83\uD835\uDE9F\uD835\uDE82\uD835\uDE91\uD835\uDE98\uD835\uDEA0 :* ' +
                _0x130b75) +
              '\n' +
              '*\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*' +
              '\n' +
              '\n' +
              '*Please select the episodes you want to download by replying these numbers*' +
              '\n' +
              '\n' +
              '*01.01 |\u276E* Informations' +
              '\n' +
              '*01.02 |\u276E* Images' +
              '\n' +
              '\n' +
              ('' + _0x41ce22) +
              '\n' +
              ('' + config.FOOTERNAME)
          )
        }
        const _0x47c88c = _0x508a23(_0x2186e5),
          _0x28a603 = _0x2186e5.imageURLs[0]
            ? config.IMAGE_ENHANCE +
              _0x2186e5.imageURLs[0].replace('/w300/', '/original/')
            : mg.imagenotfound,
          _0x5ef648 = _0x59b5cc?.key?.remoteJid,
          _0xe54567 = await getBuffer(_0x28a603),
          _0x13039c = {
            image: _0xe54567,
            caption: _0x47c88c,
          }
        const _0x3a56af = { quoted: _0x59b5cc }
        const _0x66dc01 = await _0x576bd1.sendMessage(
            _0x5ef648,
            _0x13039c,
            _0x3a56af
          ),
          _0x32f8a5 = {
            key: _0x66dc01.key,
            numrep: _0x194ae6,
            method: 'decimal',
          }
        const _0x2b3306 = _0x32f8a5
        await storenumrepdata(_0x2b3306)
        const _0x1f2dd1 = {
          text: '\uD83D\uDCDC',
          key: _0x66dc01.key,
        }
        const _0x57cb74 = {}
        return (
          (_0x57cb74.react = _0x1f2dd1),
          await _0x576bd1.sendMessage(_0x5ef648, _0x57cb74),
          await sleep(1000),
          true
        )
      } else {
        return (
          await nosearchdetails(
            _0x576bd1,
            _0x35b138,
            _0x59b5cc,
            'TV Show',
            _0x11aa01
          ),
          true
        )
      }
    }
  }
}
const moviesend = async (
  _0x59b35e,
  _0x151b6a,
  _0x2dcff7,
  _0x5ec987,
  _0x571c74,
  _0x3bbbe5,
  _0x1d9bbc
) => {
  const _0xef7066 = _0x3bbbe5?.key?.remoteJid
  if (downloadingMovie !== null) {
    const _0x4caf08 =
      "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n`Another movie is downloading, and try again after it's uploaded`\u2757\u2757\nfilm link you request:- " +
      ('' + _0x5ec987) +
      '\n' +
      '\n' +
      'currently downloading\uD83D\uDC47' +
      '\n' +
      '\n' +
      ('*"' + downloadingMovie.title + '"*') +
      '\n' +
      ('' + downloadingMovie.url) +
      '\n' +
      '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500' +
      '\n' +
      ('' + config.FOOTERNAME)
    return _0x59b35e(_0x4caf08), true
  }
  let _0x405c86 = {}
  const _0xfc5d90 = {
    title: _0x151b6a,
    url: _0x5ec987,
  }
  downloadingMovie = _0xfc5d90
  config.DOWNLOADSAPI !== '' &&
    (_0x405c86 = await fetchJson(
      '' +
        config.DOWNLOADSAPI +
        bot +
        '/downloads?jidlist=' +
        _0x1d9bbc.join(', ') +
        '&url=' +
        _0x5ec987 +
        '&title=' +
        _0x151b6a +
        '&caption=' +
        _0x2dcff7 +
        '&' +
        sinsub.apikey +
        config.DEVAPIKEY
    ))
  if (_0x5ec987 !== undefined && _0x5ec987 !== null) {
    if (!_0x5ec987.startsWith('https://mega.nz/file/')) {
      try {
        const _0x2db6a1 = await getBuffer(_0x5ec987),
          { default: _0x4b8824 } = await import('file-type'),
          _0x2c0628 = await _0x4b8824.fromBuffer(_0x2db6a1),
          _0x4363d5 = _0x2c0628 ? _0x2c0628.mime : 'video/mp4',
          _0x5bde1b = require('mime-types')
        let _0x5904b6 = _0x5bde1b.extension(_0x4363d5)
        if (_0x1d9bbc?.length === 1 && _0x1d9bbc[0] === _0xef7066) {
          const _0x598506 = { quoted: _0x3bbbe5 }
          const _0x135ef0 = await _0x571c74.sendMessage(
              _0xef7066,
              {
                document: _0x2db6a1,
                mimetype: _0x4363d5,
                fileName: '|ᴍᴀꜱᴛᴇʀ-x-ᴄyʙᴇʀ|~' + _0x151b6a + '.' + _0x5904b6,
                caption: _0x2dcff7,
              },
              _0x598506
            ),
            _0x2ecbb2 = {
              text: '\uD83D\uDCFD️',
              key: _0x135ef0.key,
            }
          const _0x240728 = { react: _0x2ecbb2 }
          await _0x571c74.sendMessage(_0xef7066, _0x240728)
          downloadingMovie = null
          if (config.DOWNLOADSAPI !== '') {
            const _0x3b4f94 = _0x405c86.index,
              _0xecbe21 = await fetchJson(
                '' +
                  config.DOWNLOADSAPI +
                  bot +
                  '/download?index=' +
                  _0x3b4f94 +
                  '&jid=' +
                  _0xef7066 +
                  '&done=true&target=true&' +
                  sinsub.apikey +
                  config.DEVAPIKEY
              )
          }
        } else {
          await Promise.all(
            _0x1d9bbc.map(async (_0x32be6c) => {
              const _0xbae2a8 = await _0x571c74.sendMessage(_0x32be6c, {
                document: _0x2db6a1,
                mimetype: _0x4363d5,
                fileName: '|ᴍᴀꜱᴛᴇʀ-x-ᴄyʙᴇʀ|~' + _0x151b6a + '.' + _0x5904b6,
                caption: _0x2dcff7,
              })
              const _0x2f8307 = {
                text: '\uD83D\uDCFD️',
                key: _0xbae2a8.key,
              }
              const _0x4fdff9 = { react: _0x2f8307 }
              await _0x571c74.sendMessage(_0x32be6c, _0x4fdff9)
              downloadingMovie = null
              if (config.DOWNLOADSAPI !== '') {
                const _0x3c0c59 = _0x405c86.index,
                  _0x14fa23 = await fetchJson(
                    '' +
                      config.DOWNLOADSAPI +
                      bot +
                      '/download?index=' +
                      _0x3c0c59 +
                      '&jid=' +
                      _0x32be6c +
                      '&done=true&target=true&' +
                      sinsub.apikey +
                      config.DEVAPIKEY
                  )
              }
            })
          )
        }
      } catch (_0x1cfec8) {
        _0x59b35e(
          "*Sorrry!! I can't download this movie fom this website, because there is fetch error*\n\nMovie Url : " +
            _0x5ec987
        )
        downloadingMovie = null
        if (config.DOWNLOADSAPI !== '') {
          const _0x186b7f = _0x405c86.index
          await Promise.all(
            _0x1d9bbc.map(async (_0x4a8698) => {
              const _0x4df99d = await fetchJson(
                '' +
                  config.DOWNLOADSAPI +
                  bot +
                  '/download?index=' +
                  _0x186b7f +
                  '&jid=' +
                  _0x4a8698 +
                  '&done=true&target=true&' +
                  sinsub.apikey +
                  config.DEVAPIKEY
              )
            })
          )
        }
      }
    } else {
      if (_0x5ec987.startsWith('https://mega.nz/file/')) {
        try {
          var _0x4e6ef8 = await File.fromURL(_0x5ec987),
            _0x3abfe6 = await _0x4e6ef8.downloadBuffer()
          const _0x386048 = await fileType.fromBuffer(_0x3abfe6),
            _0x5291df = _0x386048 ? _0x386048.mime : 'video/mp4',
            _0x4bc34f = require('mime-types')
          let _0x3ddc56 = _0x4bc34f.extension(_0x5291df)
          if (_0x1d9bbc?.length === 1 && _0x1d9bbc[0] === _0xef7066) {
            const _0xdbce39 = { quoted: _0x3bbbe5 }
            const _0x4c4de4 = await _0x571c74.sendMessage(
                _0xef7066,
                {
                  document: _0x3abfe6,
                  mimetype: _0x5291df,
                  fileName: '|ᴍᴀꜱᴛᴇʀ-x-ᴄyʙᴇʀ|~' + _0x151b6a + '.' + _0x3ddc56,
                  caption: _0x2dcff7,
                },
                _0xdbce39
              ),
              _0x2e4205 = {
                text: '\uD83D\uDCFD️',
                key: _0x4c4de4.key,
              }
            const _0x5bde09 = { react: _0x2e4205 }
            await _0x571c74.sendMessage(_0xef7066, _0x5bde09)
            downloadingMovie = null
            if (config.DOWNLOADSAPI !== '') {
              const _0x18271c = _0x405c86.index,
                _0x59161a = await fetchJson(
                  '' +
                    config.DOWNLOADSAPI +
                    bot +
                    '/download?index=' +
                    _0x18271c +
                    '&jid=' +
                    _0xef7066 +
                    '&done=true&target=true&' +
                    sinsub.apikey +
                    config.DEVAPIKEY
                )
            }
          } else {
            await Promise.all(
              _0x1d9bbc.map(async (_0xff4f16) => {
                const _0x8569de = await _0x571c74.sendMessage(_0xff4f16, {
                    document: _0x3abfe6,
                    mimetype: _0x5291df,
                    fileName: '|ᴍᴀꜱᴛᴇʀ-x-ᴄyʙᴇʀ|~' + _0x151b6a + '.' + _0x3ddc56,
                    caption: _0x2dcff7,
                  }),
                  _0x4efd8b = {
                    text: '\uD83D\uDCFD️',
                    key: _0x8569de.key,
                  }
                const _0x1adb85 = { react: _0x4efd8b }
                await _0x571c74.sendMessage(_0xff4f16, _0x1adb85)
                downloadingMovie = null
                if (config.DOWNLOADSAPI !== '') {
                  const _0x77078d = _0x405c86.index,
                    _0x45cb69 = await fetchJson(
                      '' +
                        config.DOWNLOADSAPI +
                        bot +
                        '/download?index=' +
                        _0x77078d +
                        '&jid=' +
                        _0xff4f16 +
                        '&done=true&target=true&' +
                        sinsub.apikey +
                        config.DEVAPIKEY
                    )
                }
              })
            )
          }
        } catch (_0x407b49) {
          _0x59b35e(
            "*Sorrry!! I can't download this movie fom this website, because there is fetch error*\n\nMovie Url : " +
              _0x5ec987
          )
          downloadingMovie = null
          if (config.DOWNLOADSAPI !== '') {
            const _0x33b251 = _0x405c86.index
            await Promise.all(
              _0x1d9bbc.map(async (_0xb5f1da) => {
                const _0x1139c4 = await fetchJson(
                  '' +
                    config.DOWNLOADSAPI +
                    bot +
                    '/download?index=' +
                    _0x33b251 +
                    '&jid=' +
                    _0xb5f1da +
                    '&done=true&target=true&' +
                    sinsub.apikey +
                    config.DEVAPIKEY
                )
              })
            )
          }
        }
      }
    }
  }
  downloadingMovie = null
  await sleep(30000)
  return true
}
async function episo(
  _0x40cd1f,
  _0x3cded5,
  _0x54ac63,
  _0x27015c,
  _0x47122b,
  _0x133765
) {
  let _0x44a187 = []
  if (_0x27015c.startsWith(cine.site)) {
    const _0x18b654 = await fetchJson(
      '' +
        cine.api +
        cine.cineepisode +
        _0x27015c +
        '&' +
        sinsub.apikey +
        config.DEVAPIKEY
    )
    if (_0x18b654?.result?.data) {
      const _0x4e6937 = _0x18b654?.result?.data,
        _0x345061 = _0x4e6937?.mainDetails?.title,
        _0x42a058 = _0x27015c.match(/(\d+)x(\d+)/)
      let _0x2bab27 = '',
        _0xdd42d8 = ''
      _0x42a058 &&
        _0x42a058.length >= 3 &&
        ((_0x2bab27 = _0x42a058[1]), (_0xdd42d8 = _0x42a058[2]))
      let _0x44dd7a =
        '*\u256D\u2500\u2500\u2500\u300C ᴇᴩɪꜱᴏᴅᴇ ɪɴꜰᴏ \u300D\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
        ('*|* *\u2B55 :* ' + _0x345061) +
        '\n' +
        ('*|* *\uD83D\uDCCC \uD835\uDE82\uD835\uDE8E\uD835\uDE8A\uD835\uDE9C\uD835\uDE98\uD835\uDE97 :* ' +
          _0x2bab27) +
        '\n' +
        ('*|* *\uD83D\uDCFD️ \uD835\uDE74\uD835\uDE99\uD835\uDE92\uD835\uDE9C\uD835\uDE98\uD835\uDE8D\uD835\uDE8E :* ' +
          _0xdd42d8) +
        '\n' +
        ('*|* *\uD83D\uDD87️ \uD835\uDE7B\uD835\uDE92\uD835\uDE97\uD835\uDE94 :* ' +
          _0x27015c) +
        '\n' +
        '*\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*' +
        '\n' +
        '\u25AB️ *With Sinhala Subtitles*' +
        '\n' +
        '\n' +
        '*Please select the quality you wants to download by replying these numbers.*' +
        '\n' +
        '\n'
      const _0x58c839 = _0x4e6937?.imageUrls,
        _0x8d03a3 = _0x58c839[0]
          ? config.IMAGE_ENHANCE + _0x58c839[0].replace('\n', '').trim()
          : mg.imagenotfound,
        _0x26b08b = _0x4e6937?.dllinks?.directDownloadLinks
      _0x26b08b.forEach((_0x2abb37, _0x3c0225) => {
        _0x44dd7a +=
          '*' +
          formatNumber(_0x3c0225 + 1) +
          ' |\u276E* ' +
          _0x2abb37.quality +
          ' (' +
          _0x2abb37.size +
          ')\n'
        _0x44a187.push('.dlmovie ' + _0x2abb37.link + ' ' + _0x133765)
      })
      _0x44dd7a += '\n' + ('' + config.FOOTERNAME)
      const _0x307df2 = _0x54ac63?.key?.remoteJid,
        _0x1fea2a = await getBuffer(_0x8d03a3),
        _0x3bcb27 = {
          image: _0x1fea2a,
          caption: _0x44dd7a,
        }
      const _0x377180 = { quoted: _0x54ac63 }
      const _0x4a2c53 = await _0x40cd1f.sendMessage(
          _0x307df2,
          _0x3bcb27,
          _0x377180
        ),
        _0x45877c = {
          key: _0x4a2c53.key,
          numrep: _0x44a187,
          method: 'nondecimal',
        }
      const _0x24b05b = _0x45877c
      await storenumrepdata(_0x24b05b)
      const _0x1d8366 = {
        text: '\uD83D\uDCDC',
        key: _0x4a2c53.key,
      }
      const _0x580ac6 = {}
      return (
        (_0x580ac6.react = _0x1d8366),
        await _0x40cd1f.sendMessage(_0x307df2, _0x580ac6),
        await sleep(1000),
        true
      )
    } else {
      return (
        await nosearchdetails(
          _0x40cd1f,
          _0x3cded5,
          _0x54ac63,
          'Episode',
          _0x47122b
        ),
        true
      )
    }
  } else {
    if (_0x27015c.startsWith(sinsub.site)) {
      const _0x3a82c0 = await fetchJson(
          '' +
            sinsub.api +
            sinsub.sinsubepisode +
            _0x27015c +
            '&' +
            sinsub.apikey +
            config.DEVAPIKEY
        ),
        _0x400e37 = _0x3a82c0.movied,
        _0x17e09c = await fetchJson(
          '' +
            sinsub.api +
            sinsub.sinsuballdl +
            _0x27015c +
            '&' +
            sinsub.apikey +
            config.DEVAPIKEY
        ),
        _0x145ac0 = _0x17e09c.movied
      if (_0x400e37 && _0x145ac0) {
        const _0xd58a3d = _0x400e37.find(
            (_0x1b1dc4) => _0x1b1dc4.episodeLink === _0x27015c
          ),
          _0x5baf17 = _0xd58a3d.imageUrls[0]
            ? config.IMAGE_ENHANCE + _0xd58a3d.imageUrls[0]
            : mg.imagenotfound
        let _0x2f15e7 = _0xd58a3d.episodeTitle,
          _0x30e619 = _0xd58a3d.seasonNumber,
          _0x5effef = _0xd58a3d.episodeNumber,
          _0x381b1f =
            '*\u256D\u2500\u2500\u2500\u300C ᴇᴩɪꜱᴏᴅᴇ ɪɴꜰᴏ \u300D\u2500\u2500\u2500\u25CF\u25CF\u25BA*\n' +
            ('*|* *\u2B55 :* ' + _0x2f15e7) +
            '\n' +
            ('*|* *\uD83D\uDCCC \uD835\uDE82\uD835\uDE8E\uD835\uDE8A\uD835\uDE9C\uD835\uDE98\uD835\uDE97 :* ' +
              _0x30e619) +
            '\n' +
            ('*|* *\uD83D\uDCFD️ \uD835\uDE74\uD835\uDE99\uD835\uDE92\uD835\uDE9C\uD835\uDE98\uD835\uDE8D\uD835\uDE8E :* ' +
              _0x5effef) +
            '\n' +
            ('*|* *\uD83D\uDD87️ \uD835\uDE7B\uD835\uDE92\uD835\uDE97\uD835\uDE94 :* ' +
              _0x27015c) +
            '\n' +
            '*\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25CF\u25CF\u25BA*' +
            '\n' +
            '\u25AB️ *With Sinhala Subtitles*' +
            '\n' +
            '\n' +
            '*Please select the quality you wants to download by replying these numbers.*' +
            '\n' +
            '\n'
        const _0x54c377 = _0x145ac0.download
        _0x54c377 &&
          _0x54c377?.length > 0 &&
          _0x54c377.forEach((_0x17ae6a, _0x133375) => {
            _0x17ae6a &&
              _0x17ae6a.link &&
              ((_0x381b1f +=
                '*' +
                formatNumber(_0x133375 + 1) +
                ' |\u276E* ' +
                _0x17ae6a.quality +
                ' (' +
                _0x17ae6a.size +
                ')\n'),
              _0x44a187.push('.dlmovie ' + _0x17ae6a.link + ' ' + _0x133765))
          })
        _0x381b1f += '\n' + ('' + config.FOOTERNAME)
        const _0x2d45ed = _0x54ac63?.key?.remoteJid,
          _0x14b044 = await getBuffer(_0x5baf17),
          _0x738751 = {
            image: _0x14b044,
            caption: _0x381b1f,
          }
        const _0x46a928 = { quoted: _0x54ac63 }
        const _0xdc69b4 = await _0x40cd1f.sendMessage(
            _0x2d45ed,
            _0x738751,
            _0x46a928
          ),
          _0x1519cb = {
            key: _0xdc69b4.key,
            numrep: _0x44a187,
            method: 'nondecimal',
          }
        const _0x147e49 = _0x1519cb
        await storenumrepdata(_0x147e49)
        const _0x1182b1 = {
          text: '\uD83D\uDCDC',
          key: _0xdc69b4.key,
        }
        const _0x34d7ca = {}
        return (
          (_0x34d7ca.react = _0x1182b1),
          await _0x40cd1f.sendMessage(_0x2d45ed, _0x34d7ca),
          await sleep(1000),
          true
        )
      } else {
        return (
          await nosearchdetails(
            _0x40cd1f,
            _0x3cded5,
            _0x54ac63,
            'Episode',
            _0x47122b
          ),
          true
        )
      }
    }
  }
}
const _0x53a521 = {}
_0x53a521.pattern = 'movie'
_0x53a521.alias = ['mv', 'film']
_0x53a521.react = '\uD83C\uDFA5'
_0x53a521.desc = 'Get a movie'
_0x53a521.category = 'movie'
_0x53a521.use = '.movie <query>'
_0x53a521.filename = __filename
cmd(
  _0x53a521,
  async (
    _0x2bf5fd,
    _0x104224,
    _0x309b25,
    {
      from: _0x5093a4,
      l: _0x3223c7,
      quoted: _0x18bedc,
      body: _0x51af58,
      isCmd: _0x312e2b,
      command: _0xaca605,
      args: _0x4d3063,
      q: _0xd1835c,
      isGroup: _0x369c97,
      sender: _0x2dd7d8,
      senderNumber: _0x5f305f,
      botNumber2: _0x54e823,
      botNumber: _0x2d8924,
      pushname: _0x532e8d,
      isMe: _0x518c8c,
      isOwner: _0xfd6282,
      groupMetadata: _0x5568ba,
      groupName: _0x321ae5,
      participants: _0x6c17e5,
      isItzcp: _0x61c030,
      groupAdmins: _0x37315e,
      isBotAdmins: _0x49cbcb,
      isAdmins: _0x2d875c,
      reply: _0x4195c8,
      react: _0x4307cf,
    }
  ) => {
    try {
      const _0x21b9a4 = 'Movie'
      let _0x2b1806 = [],
        _0x51ceef
      if (_0x369c97) {
        const _0x58707c = await fetchJson(
          config.DOWNLOADSAPI +
            '/' +
            _0x5093a4 +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        if (
          _0x58707c &&
          (_0x58707c?.error || _0x58707c?.data?.type == 'false')
        ) {
          return
        }
        _0x2b1806.push(_0x309b25.chat)
        _0x51ceef = _0xd1835c
      } else {
        if (!_0x369c97) {
          const _0x58977b = await fetchJson(
            config.DOWNLOADSAPI +
              '/' +
              _0x2dd7d8 +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (
            _0x58977b &&
            (_0x58977b?.error || _0x58977b?.data?.type == 'false')
          ) {
            return
          }
          const _0x75cead = await parseInput(_0xd1835c, _0x309b25.chat)
          _0x51ceef = _0x75cead.input
          _0x2b1806 = _0x75cead.chat
        }
      }
      if (_0x51ceef) {
        const _0x395088 = _0xd1835c.replace(_0x51ceef, '').trim()
        if (
          _0x51ceef.startsWith('' + cine.site + cine.movie) ||
          _0x51ceef.startsWith('' + sinsub.site + sinsub.movie)
        ) {
          await movi(
            _0x2bf5fd,
            _0x2b1806,
            _0x104224,
            _0x51ceef,
            _0x4195c8,
            _0x395088
          )
        } else {
          if (
            _0x51ceef.startsWith('' + cine.site + cine.tvshow) ||
            _0x51ceef.startsWith('' + sinsub.site + sinsub.tvshow)
          ) {
            await _0x4195c8('Please use tvshow cmd for that')
          } else {
            _0x51ceef.startsWith('' + cine.site + cine.episode) ||
            _0x51ceef.startsWith('' + sinsub.site + sinsub.episode)
              ? await _0x4195c8('Please use episode cmd for that')
              : await sea(
                  _0x2bf5fd,
                  _0x2b1806,
                  _0x104224,
                  _0x51ceef,
                  _0x4195c8,
                  _0x21b9a4,
                  _0x395088
                )
          }
        }
      } else {
        !_0x51ceef
          ? _0x4195c8('Please enter search query!!')
          : _0x4195c8('Ohh Sorry!! Got an error while fetching query!')
      }
    } catch (_0xddf7f0) {
      console.log(_0xddf7f0)
    }
  }
)
const _0x378940 = {}
_0x378940.pattern = 'tvshow'
_0x378940.alias = ['mv2', 'tv']
_0x378940.react = '\uD83D\uDCFA'
_0x378940.desc = 'Get a tv seiris'
_0x378940.category = 'movie'
_0x378940.use = '.movie <query>'
_0x378940.filename = __filename
cmd(
  _0x378940,
  async (
    _0x5af98a,
    _0x3dc9ff,
    _0x46ae0c,
    {
      from: _0x5d7105,
      l: _0x1666a7,
      quoted: _0x1c5b91,
      body: _0x4e5bd4,
      isCmd: _0x53c22c,
      command: _0x131bbc,
      args: _0x1feef3,
      q: _0x5413bc,
      isGroup: _0x248f81,
      sender: _0x5ceaa0,
      senderNumber: _0x14fb9f,
      botNumber2: _0x1fb137,
      botNumber: _0x58bceb,
      pushname: _0xc70d42,
      isMe: _0x23059b,
      isOwner: _0x506964,
      groupMetadata: _0x285d21,
      groupName: _0x1daf04,
      participants: _0x462a63,
      isItzcp: _0x14b2a1,
      groupAdmins: _0x258509,
      isBotAdmins: _0x2e2b37,
      isAdmins: _0x49c67e,
      reply: _0x1561b1,
      react: _0x4ca49c,
    }
  ) => {
    try {
      const _0x4642b4 = 'TVShow'
      let _0x5ec5f6 = [],
        _0x5e5ef6
      if (_0x248f81) {
        const _0x2c728a = await fetchJson(
          config.DOWNLOADSAPI +
            '/' +
            _0x5d7105 +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        if (
          _0x2c728a &&
          (_0x2c728a?.error || _0x2c728a?.data?.type == 'false')
        ) {
          return
        }
        _0x5ec5f6.push(_0x46ae0c.chat)
        _0x5e5ef6 = _0x5413bc
      } else {
        if (!_0x248f81) {
          const _0x42f5f3 = await fetchJson(
            config.DOWNLOADSAPI +
              '/' +
              _0x5ceaa0 +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (
            _0x42f5f3 &&
            (_0x42f5f3?.error || _0x42f5f3?.data?.type == 'false')
          ) {
            return
          }
          const _0x2fe58a = await parseInput(_0x5413bc, _0x46ae0c.chat)
          _0x5e5ef6 = _0x2fe58a.input
          _0x5ec5f6 = _0x2fe58a.chat
        }
      }
      if (_0x5e5ef6) {
        const _0x3d0277 = _0x5413bc.replace(_0x5e5ef6, '').trim()
        if (
          _0x5e5ef6.startsWith('' + cine.site + cine.movie) ||
          _0x5e5ef6.startsWith('' + sinsub.site + sinsub.movie)
        ) {
          await _0x1561b1('Please use movie cmd for that')
        } else {
          if (
            _0x5e5ef6.startsWith('' + cine.site + cine.tvshow) ||
            _0x5e5ef6.startsWith('' + sinsub.site + sinsub.tvshow)
          ) {
            await tvsh(
              _0x5af98a,
              _0x5ec5f6,
              _0x3dc9ff,
              _0x5e5ef6,
              _0x1561b1,
              _0x3d0277
            )
          } else {
            _0x5e5ef6.startsWith('' + cine.site + cine.episode) ||
            _0x5e5ef6.startsWith('' + sinsub.site + sinsub.episode)
              ? await _0x1561b1('Please use episode cmd for that')
              : await sea(
                  _0x5af98a,
                  _0x5ec5f6,
                  _0x3dc9ff,
                  _0x5e5ef6,
                  _0x1561b1,
                  _0x4642b4,
                  _0x3d0277
                )
          }
        }
      } else {
        !_0x5e5ef6
          ? _0x1561b1('Please enter search query!!')
          : _0x1561b1('Ohh Sorry!! Got an error while fetching query!')
      }
    } catch (_0x579223) {
      console.error(_0x579223)
    }
  }
)
const _0xccfc1 = {}
_0xccfc1.pattern = 'dlmovie'
_0xccfc1.alias = ['dl']
_0xccfc1.react = '\uD83C\uDFA5'
_0xccfc1.desc = 'download a movie'
_0xccfc1.category = 'movie'
_0xccfc1.use = '.dlmovie <query>'
_0xccfc1.filename = __filename
cmd(
  _0xccfc1,
  async (
    _0x12d65a,
    _0x41a46d,
    _0x49b3ea,
    {
      from: _0x5c56ab,
      l: _0x30b1f9,
      quoted: _0x137444,
      body: _0x4ba4fb,
      isCmd: _0x4074e5,
      command: _0x329dcd,
      args: _0x2f26a4,
      q: _0x54decf,
      isGroup: _0x1e58be,
      sender: _0x413bc0,
      senderNumber: _0x49e2aa,
      botNumber2: _0x5d618b,
      botNumber: _0x1ff0f5,
      pushname: _0x4bc0db,
      isMe: _0x3300c0,
      isOwner: _0x30daf3,
      groupMetadata: _0x3325e2,
      groupName: _0x3134c6,
      participants: _0x23831e,
      isItzcp: _0xa9103a,
      groupAdmins: _0x489d49,
      isBotAdmins: _0x26ac72,
      isAdmins: _0x69e4d9,
      reply: _0x52fc1d,
      react: _0x4b8edd,
    }
  ) => {
    try {
      let _0x4f4234 = [],
        _0x59dbca,
        _0x43c833
      if (_0x1e58be) {
        const _0x3d9afb = await fetchJson(
          config.DOWNLOADSAPI +
            '/' +
            _0x5c56ab +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        if (
          _0x3d9afb &&
          (_0x3d9afb?.error || _0x3d9afb?.data?.type == 'false')
        ) {
          return
        }
        _0x4f4234.push(_0x49b3ea.chat)
        _0x59dbca = _0x54decf
        _0x43c833 = false
      } else {
        if (!_0x1e58be) {
          const _0x31c97b = await fetchJson(
            config.DOWNLOADSAPI +
              '/' +
              _0x413bc0 +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (
            _0x31c97b &&
            (_0x31c97b?.error || _0x31c97b?.data?.type == 'false')
          ) {
            return
          }
          const _0x4b96cf = await parseInput(_0x54decf, _0x49b3ea.chat)
          _0x59dbca = _0x4b96cf.input
          _0x4f4234 = _0x4b96cf.chat
          _0x43c833 = _0x4b96cf.me
        }
      }
      if (_0x59dbca) {
        let _0x122c57,
          _0x264938,
          _0x505d76 = _0x59dbca.split('|')
        _0x59dbca = _0x505d76[0]
        _0x122c57 = _0x505d76[1] ? _0x505d76[1] : null
        let _0x110acb
        if (_0x59dbca.startsWith('' + cine.site)) {
          let _0x5edb46
          if (_0x59dbca.startsWith('' + cine.site + cine.movie)) {
            _0x5edb46 = await fetchJson(
              '' +
                cine.api +
                cine.cinemovie +
                _0x59dbca +
                '?' +
                sinsub.apikey +
                config.DEVAPIKEY
            )
          } else {
            _0x59dbca.startsWith('' + cine.site + cine.episode) &&
              (_0x5edb46 = await fetchJson(
                '' +
                  cine.api +
                  cine.cineepisode +
                  _0x59dbca +
                  '?' +
                  sinsub.apikey +
                  config.DEVAPIKEY
              ))
          }
          const _0x524b0c = await fetchJson(
            '' +
              cine.api +
              cine.cinedllink +
              _0x59dbca +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (_0x5edb46?.result?.data?.mainDetails?.maintitle) {
            _0x122c57 === null &&
              (_0x122c57 = _0x5edb46?.result?.data?.mainDetails?.maintitle)
          } else {
            _0x5edb46?.result?.data?.mainDetails?.title &&
              _0x122c57 === null &&
                (_0x122c57 = _0x5edb46?.result?.data?.mainDetails?.title)
          }
          _0x524b0c?.result?.data?.dllink &&
            (_0x264938 = _0x524b0c?.result?.data?.dllink)
        } else {
          if (_0x59dbca.startsWith('' + sinsub.site)) {
            let _0x209e1d
            if (_0x59dbca.startsWith('' + sinsub.site + sinsub.movie)) {
              _0x209e1d = await fetchJson(
                '' +
                  sinsub.api +
                  sinsub.sinsubmovie +
                  _0x59dbca +
                  '?' +
                  sinsub.apikey +
                  config.DEVAPIKEY
              )
            } else {
              _0x59dbca.startsWith('' + sinsub.site + sinsub.episode) &&
                (_0x209e1d = await fetchJson(
                  '' +
                    sinsub.api +
                    sinsub.sinsubepisode +
                    _0x59dbca +
                    '?' +
                    sinsub.apikey +
                    config.DEVAPIKEY
                ))
            }
            const _0x1f205f = await fetchJson(
              '' +
                sinsub.api +
                sinsub.sinsubdllink +
                _0x59dbca +
                '&' +
                sinsub.apikey +
                config.DEVAPIKEY
            )
            if (_0x209e1d?.movied?.title) {
              _0x122c57 === null && (_0x122c57 = _0x209e1d?.movied?.title)
            } else {
              if (Array.isArray(_0x209e1d?.movied)) {
                const _0x1213ce = _0x209e1d.movied.find(
                  (_0x2bce40) => _0x2bce40.episodeLink === link
                )
                _0x122c57 === null &&
                  (_0x122c57 =
                    _0x1213ce.episodeTitle + '[' + _0x1213ce.episode + ']')
              }
            }
            _0x1f205f?.movied?.link && (_0x264938 = _0x1f205f?.movied?.link)
          }
        }
        const _0x47db49 = await getFileInfo(_0x264938),
          _0x5c5215 = _0x47db49.fileSize,
          _0x489b58 = _0x47db49.fileName
        ;(_0x122c57 === undefined || _0x122c57 === null) &&
          (_0x122c57 = _0x489b58)
        _0x110acb = _0x5c5215
        const _0x196829 =
            _0x122c57 +
            ' ' +
            mg.jointitleandqualitydl +
            '\nsize : ' +
            _0x110acb +
            '\n\n' +
            mg.footer,
          _0x6c3378 = checkSizeAndReply(_0x110acb)
        if (_0x6c3378 && _0x6c3378 === 'True') {
          await moviesend(
            _0x52fc1d,
            _0x122c57,
            _0x196829,
            _0x264938,
            _0x12d65a,
            _0x41a46d,
            _0x4f4234
          )
        } else {
          return _0x6c3378 && _0x6c3378 !== 'True'
            ? await _0x52fc1d(
                _0x122c57 +
                  ' ' +
                  mg.jointitleandqualitydl +
                  '\n\n*' +
                  _0x6c3378 +
                  '*\n\n' +
                  mg.downloadusinglink +
                  '\n\nLink: ' +
                  _0x264938 +
                  '\n\n' +
                  mg.footer
              )
            : await _0x52fc1d('Got an error while checking size')
        }
      }
    } catch (_0x3460ab) {
      console.log(_0x3460ab)
    }
  }
)
const _0x5d6c81 = {}
_0x5d6c81.pattern = 'episode'
_0x5d6c81.alias = ['epi', 'ep']
_0x5d6c81.react = '\uD83C\uDF9E️'
_0x5d6c81.desc = 'Get a tv seiris'
_0x5d6c81.category = 'movie'
_0x5d6c81.use = '.movie <query>'
_0x5d6c81.filename = __filename
cmd(
  _0x5d6c81,
  async (
    _0x45758b,
    _0x1e75c9,
    _0x1b4480,
    {
      from: _0x36f394,
      l: _0x4b1bef,
      quoted: _0x5d5380,
      body: _0x1ea353,
      isCmd: _0x2397e2,
      command: _0x2d6572,
      args: _0x1add3b,
      q: _0xe61241,
      isGroup: _0x2cae30,
      sender: _0x2f6607,
      senderNumber: _0x4fd569,
      botNumber2: _0x4f9511,
      botNumber: _0x560310,
      pushname: _0x52d491,
      isMe: _0x246a75,
      isOwner: _0x159504,
      groupMetadata: _0x25edbd,
      groupName: _0x20155d,
      participants: _0x38e1f7,
      isItzcp: _0x1523f2,
      groupAdmins: _0x430f41,
      isBotAdmins: _0x1e852c,
      isAdmins: _0x1b9971,
      reply: _0x60dfa8,
      react: _0x15373a,
    }
  ) => {
    try {
      let _0x26f681 = [],
        _0xe7fa09
      if (_0x2cae30) {
        const _0x102f32 = await fetchJson(
          config.DOWNLOADSAPI +
            '/' +
            _0x36f394 +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        if (
          _0x102f32 &&
          (_0x102f32?.error || _0x102f32?.data?.type == 'false')
        ) {
          return
        }
        _0x26f681.push(_0x1b4480.chat)
        _0xe7fa09 = _0xe61241
      } else {
        if (!_0x2cae30) {
          const _0x2745ff = await fetchJson(
            config.DOWNLOADSAPI +
              '/' +
              _0x2f6607 +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (
            _0x2745ff &&
            (_0x2745ff?.error || _0x2745ff?.data?.type == 'false')
          ) {
            return
          }
          const _0x10312e = await parseInput(_0xe61241, _0x1b4480.chat)
          _0xe7fa09 = _0x10312e.input
          _0x26f681 = _0x10312e.chat
        }
      }
      if (_0xe7fa09) {
        const _0x3152e6 = _0xe61241.replace(_0xe7fa09, '').trim()
        if (
          _0xe7fa09.startsWith('' + cine.site + cine.movie) ||
          _0xe7fa09.startsWith('' + sinsub.site + sinsub.movie)
        ) {
          await _0x60dfa8('Please use movie cmd for that')
        } else {
          if (
            _0xe7fa09.startsWith('' + cine.site + cine.tvshow) ||
            _0xe7fa09.startsWith('' + sinsub.site + sinsub.tvshow)
          ) {
            await _0x60dfa8('Please use tvshow cmd for that')
          } else {
            _0xe7fa09.startsWith('' + cine.site + cine.episode) ||
            _0xe7fa09.startsWith('' + sinsub.site + sinsub.episode)
              ? await episo(
                  _0x45758b,
                  _0x26f681,
                  _0x1e75c9,
                  _0xe7fa09,
                  _0x60dfa8,
                  _0x3152e6
                )
              : await _0x60dfa8(
                  'Please use  only sinhalasubs and cinesubz links!!'
                )
          }
        }
      } else {
        !_0xe7fa09
          ? _0x60dfa8('Please enter episode url!!')
          : _0x60dfa8('Ohh Sorry!! Got an error while fetching query!')
      }
    } catch (_0x31d630) {
      console.error(_0x31d630)
    }
  }
)
const _0x3efd08 = {}
_0x3efd08.alias = ['mvimages']
_0x3efd08.react = '\uD83C\uDFA5'
_0x3efd08.desc = 'get a movie images'
_0x3efd08.category = 'movie'
_0x3efd08.use = '.mvimages <link>'
_0x3efd08.filename = __filename
cmd(
  _0x3efd08,
  async (
    _0xd7fad0,
    _0x2a7804,
    _0x23df52,
    {
      from: _0xe4e502,
      l: _0x60f42b,
      quoted: _0x540f7f,
      body: _0x1e1c4c,
      isCmd: _0x26140a,
      command: _0x2e4cb9,
      args: _0x3c7ac9,
      q: _0x528463,
      isGroup: _0xb83d3f,
      sender: _0x1ab055,
      senderNumber: _0x2b50ed,
      botNumber2: _0x1323fe,
      botNumber: _0x4b0067,
      pushname: _0x387f32,
      isMe: _0x4507cd,
      isOwner: _0x1b63c1,
      groupMetadata: _0x236794,
      groupName: _0x6fd92b,
      participants: _0x2c627d,
      isItzcp: _0x46e265,
      groupAdmins: _0x143aed,
      isBotAdmins: _0x5579f2,
      isAdmins: _0x6f868d,
      reply: _0x3d3438,
      react: _0x44bbcb,
    }
  ) => {
    try {
      let _0x1a2a2e = _0xe4e502,
        _0x27f3c2 = [],
        _0x322392,
        _0x676388
      if (_0xb83d3f) {
        const _0x3a572a = await fetchJson(
          config.DOWNLOADSAPI +
            '/' +
            _0xe4e502 +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        if (
          _0x3a572a &&
          (_0x3a572a?.error || _0x3a572a?.data?.type == 'false')
        ) {
          return
        }
        _0x27f3c2.push(_0x23df52.chat)
        _0x322392 = _0x528463
        _0x676388 = false
      } else {
        if (!_0xb83d3f) {
          const _0x4360b1 = await fetchJson(
            config.DOWNLOADSAPI +
              '/' +
              _0x1ab055 +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (
            _0x4360b1 &&
            (_0x4360b1?.error || _0x4360b1?.data?.type == 'false')
          ) {
            return
          }
          const _0x5b4532 = await parseInput(_0x528463, _0x23df52.chat)
          _0x322392 = _0x5b4532.input
          _0x27f3c2 = _0x5b4532.chat
          _0x676388 = _0x5b4532.me
        }
      }
      if (_0x322392) {
        if (_0x322392.startsWith('' + cine.site)) {
          let _0x1566a2
          if (_0x322392.startsWith('' + cine.site + cine.movie)) {
            const _0x585121 = await fetchJson(
              '' +
                cine.api +
                cine.cinemovie +
                _0x322392 +
                '?' +
                sinsub.apikey +
                config.DEVAPIKEY
            )
            _0x1566a2 = _0x585121?.result?.data?.mainDetails?.imageUrl
          } else {
            if (_0x322392.startsWith('' + cine.site + cine.tvshow)) {
              const _0x677dac = await fetchJson(
                '' +
                  cine.api +
                  cine.cinetvshow +
                  _0x322392 +
                  '?' +
                  sinsub.apikey +
                  config.DEVAPIKEY
              )
              _0x1566a2 = _0x677dac?.result?.data?.imageUrls
            }
          }
          _0x1566a2.forEach(async (_0x36b924) => {
            if (_0x27f3c2?.length === 1 && _0x27f3c2[0] === _0x1a2a2e) {
              const _0x5c7e64 = { url: _0x36b924 }
              const _0x3b9acd = {
                image: _0x5c7e64,
                caption: '' + config.FOOTERNAME,
              }
              const _0x5a3669 = { quoted: _0x2a7804 }
              const _0x8ec584 = await _0xd7fad0.sendMessage(
                  _0x1a2a2e,
                  _0x3b9acd,
                  _0x5a3669
                ),
                _0x96b111 = {
                  text: '\uD83D\uDCFD️',
                  key: _0x8ec584.key,
                }
              const _0x50074a = { react: _0x96b111 }
              await _0xd7fad0.sendMessage(_0x1a2a2e, _0x50074a)
            } else {
              await Promise.all(
                _0x27f3c2.map(async (_0x11522c) => {
                  const _0x54e8a0 = { url: _0x36b924 }
                  const _0x2547f3 = {
                    image: _0x54e8a0,
                    caption: '' + config.FOOTERNAME,
                  }
                  const _0x407fdb = await _0xd7fad0.sendMessage(
                      _0x11522c,
                      _0x2547f3
                    ),
                    _0x3f7983 = {
                      text: '\uD83D\uDCFD️',
                      key: _0x407fdb.key,
                    }
                  const _0xb6e6e4 = { react: _0x3f7983 }
                  await _0xd7fad0.sendMessage(_0x11522c, _0xb6e6e4)
                })
              )
            }
          })
        } else {
          if (_0x322392.startsWith('' + sinsub.site)) {
            let _0x4a68f8
            if (_0x322392.startsWith('' + sinsub.site + sinsub.movie)) {
              const _0x203ab3 = await fetchJson(
                '' +
                  sinsub.api +
                  sinsub.sinsubmovie +
                  _0x322392 +
                  '?' +
                  sinsub.apikey +
                  config.DEVAPIKEY
              )
              _0x4a68f8 = _0x203ab3?.movied?.imageUrls
            } else {
              if (_0x322392.startsWith('' + sinsub.site + sinsub.tvshow)) {
                const _0x2d26d3 = await fetchJson(
                  '' +
                    sinsub.api +
                    sinsub.sinsubtvshow +
                    _0x322392 +
                    '?' +
                    sinsub.apikey +
                    config.DEVAPIKEY
                )
                _0x4a68f8 = _0x2d26d3?.movied?.imageURLs
              }
            }
            _0x4a68f8.forEach(async (_0x1be6af) => {
              if (_0x27f3c2?.length === 1 && _0x27f3c2[0] === _0x1a2a2e) {
                const _0x4a1362 = { quoted: _0x2a7804 }
                const _0x36398a = await _0xd7fad0.sendMessage(
                    _0x1a2a2e,
                    {
                      image: { url: _0x1be6af.replace('/w300/', '/original/') },
                      caption: '' + config.FOOTERNAME,
                    },
                    _0x4a1362
                  ),
                  _0x2c593b = {
                    text: '\uD83D\uDCFD️',
                    key: _0x36398a.key,
                  }
                const _0xa769d1 = { react: _0x2c593b }
                await _0xd7fad0.sendMessage(_0x1a2a2e, _0xa769d1)
              } else {
                await Promise.all(
                  _0x27f3c2.map(async (_0x11c46e) => {
                    const _0x41f106 = { url: _0x1be6af }
                    const _0x3f3888 = {
                      image: _0x41f106,
                      caption: '' + config.FOOTERNAME,
                    }
                    const _0x504de9 = await _0xd7fad0.sendMessage(
                        _0x11c46e,
                        _0x3f3888
                      ),
                      _0x559b22 = {
                        text: '\uD83D\uDCFD️',
                        key: _0x504de9.key,
                      }
                    const _0x286c42 = { react: _0x559b22 }
                    await _0xd7fad0.sendMessage(_0x11c46e, _0x286c42)
                  })
                )
              }
            })
          }
        }
      }
    } catch (_0x559c55) {
      console.log(_0x559c55)
    }
  }
)
const _0x3db1d8 = {}
_0x3db1d8.alias = ['mvinfo']
_0x3db1d8.react = '\uD83C\uDFA5'
_0x3db1d8.desc = 'get a movie info'
_0x3db1d8.category = 'movie'
_0x3db1d8.use = '.mvinfo <link>'
_0x3db1d8.filename = __filename
cmd(
  _0x3db1d8,
  async (
    _0x4ce7fd,
    _0x44b7f4,
    _0x543a32,
    {
      from: _0x290873,
      l: _0x148784,
      quoted: _0x84354b,
      body: _0x44562c,
      isCmd: _0x4974a6,
      command: _0x497544,
      args: _0x5c8735,
      q: _0x271310,
      isGroup: _0x1d0ad6,
      sender: _0x56d7a1,
      senderNumber: _0xb605da,
      botNumber2: _0x1e64c1,
      botNumber: _0x2a7d59,
      pushname: _0x2bd57f,
      isMe: _0x2ec29d,
      isOwner: _0x118532,
      groupMetadata: _0x36cb15,
      groupName: _0x436f53,
      participants: _0x42a31d,
      isItzcp: _0x26d91f,
      groupAdmins: _0xe77444,
      isBotAdmins: _0x537534,
      isAdmins: _0x270552,
      reply: _0x2a7439,
      react: _0x457d18,
    }
  ) => {
    try {
      let _0xfe059b = _0x290873,
        _0x21f541 = [],
        _0x9fae0a,
        _0x309c91
      if (_0x1d0ad6) {
        const _0x4391c1 = await fetchJson(
          config.DOWNLOADSAPI +
            '/' +
            _0x290873 +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        if (
          _0x4391c1 &&
          (_0x4391c1?.error || _0x4391c1?.data?.type == 'false')
        ) {
          return
        }
        _0x21f541.push(_0x543a32.chat)
        _0x9fae0a = _0x271310
        _0x309c91 = false
      } else {
        if (!_0x1d0ad6) {
          const _0x1e657f = await fetchJson(
            config.DOWNLOADSAPI +
              '/' +
              _0x56d7a1 +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (
            _0x1e657f &&
            (_0x1e657f?.error || _0x1e657f?.data?.type == 'false')
          ) {
            return
          }
          const _0x175843 = await parseInput(_0x271310, _0x543a32.chat)
          _0x9fae0a = _0x175843.input
          _0x21f541 = _0x175843.chat
          _0x309c91 = _0x175843.me
        }
      }
      if (_0x9fae0a) {
        if (_0x9fae0a.startsWith('' + cine.site)) {
          if (_0x9fae0a.startsWith('' + cine.site + cine.movie)) {
            await sendinfo(
              _0x4ce7fd,
              _0x21f541,
              _0x44b7f4,
              'movie',
              _0x2a7439,
              _0x271310
            )
          } else {
            _0x9fae0a.startsWith('' + cine.site + cine.tvshow) &&
              (await sendinfo(
                _0x4ce7fd,
                _0x21f541,
                _0x44b7f4,
                'tvshow',
                _0x2a7439,
                _0x271310
              ))
          }
        } else {
          if (_0x9fae0a.startsWith('' + sinsub.site)) {
            if (_0x9fae0a.startsWith('' + sinsub.site + sinsub.movie)) {
              await sendinfo(
                _0x4ce7fd,
                _0x21f541,
                _0x44b7f4,
                'movie',
                _0x2a7439,
                _0x271310
              )
            } else {
              _0x9fae0a.startsWith('' + sinsub.site + sinsub.tvshow) &&
                (await sendinfo(
                  _0x4ce7fd,
                  _0x21f541,
                  _0x44b7f4,
                  'tvshow',
                  _0x2a7439,
                  _0x271310
                ))
            }
          }
        }
      }
    } catch (_0x3bdc40) {
      console.log(_0x3bdc40)
    }
  }
)
const _0x1d7177 = {}
_0x1d7177.alias = ['imdb']
_0x1d7177.react = '\uD83C\uDFA5'
_0x1d7177.desc = 'get a movie imdb info'
_0x1d7177.category = 'movie'
_0x1d7177.use = '.imdb <link>'
_0x1d7177.filename = __filename
cmd(
  _0x1d7177,
  async (
    _0x2fa564,
    _0x4799b3,
    _0x1bcbb3,
    {
      from: _0x38e7e4,
      l: _0x137a7a,
      quoted: _0x1c5bb0,
      body: _0x3a53eb,
      isCmd: _0x5cb53f,
      command: _0x1b6488,
      args: _0xae395e,
      q: _0xc42448,
      isGroup: _0x202434,
      sender: _0x58289c,
      senderNumber: _0x1fc939,
      botNumber2: _0x484445,
      botNumber: _0x4ee1fe,
      pushname: _0x213e74,
      isMe: _0x6e3df2,
      isOwner: _0x16e6c4,
      groupMetadata: _0x48ee18,
      groupName: _0x2bb38a,
      participants: _0x243c13,
      isItzcp: _0x29db2d,
      groupAdmins: _0xace4a4,
      isBotAdmins: _0x5bf358,
      isAdmins: _0x562213,
      reply: _0x3e4b72,
      react: _0x19f0d6,
    }
  ) => {
    try {
      let _0x3baf07 = _0x38e7e4,
        _0x1387ea = [],
        _0x252c70,
        _0x4d9773
      if (_0x202434) {
        const _0x1731e9 = await fetchJson(
          config.DOWNLOADSAPI +
            '/' +
            _0x38e7e4 +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        if (
          _0x1731e9 &&
          (_0x1731e9?.error || _0x1731e9?.data?.type == 'false')
        ) {
          return
        }
        _0x1387ea.push(_0x1bcbb3.chat)
        _0x252c70 = _0xc42448
        _0x4d9773 = false
      } else {
        if (!_0x202434) {
          const _0x3c1694 = await fetchJson(
            config.DOWNLOADSAPI +
              '/' +
              _0x58289c +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (
            _0x3c1694 &&
            (_0x3c1694?.error || _0x3c1694?.data?.type == 'false')
          ) {
            return
          }
          const _0x474050 = await parseInput(_0xc42448, _0x1bcbb3.chat)
          _0x252c70 = _0x474050.input
          _0x1387ea = _0x474050.chat
          _0x4d9773 = _0x474050.me
        }
      }
      if (_0x252c70) {
        const _0x4b8347 = _0xc42448.replace(_0x252c70, '').trim()
        if (_0x252c70.startsWith('id=')) {
          _0x252c70 = _0x252c70.replace('id=', '').trim()
          const _0x3a2ed5 = await fetchJson(
              'https://omdbapi.com/?apikey=742b2d09&i=' + _0x252c70
            ),
            _0x126c5d = _0x3a2ed5.Title,
            _0x1c4278 = _0x3a2ed5.Year,
            _0x308bcf = _0x3a2ed5.Released,
            _0x21b7f9 = _0x3a2ed5.Ratings[0].Value,
            _0x509a1c = _0x3a2ed5.Runtime,
            _0x59275d = _0x3a2ed5.Language,
            _0x5c698c = _0x3a2ed5.Director,
            _0x53cbcb = _0x3a2ed5.Genre,
            _0x30b146 = _0x3a2ed5.Country,
            _0x4c8459 = _0x3a2ed5.Plot,
            _0x134817 = _0x3a2ed5.Actors,
            _0x1dc1bb = _0x3a2ed5.Poster.replace(
              '@._V1_SX300',
              '@._V1_FMjpg_UY2902_'
            )
          let _0x162bb9 =
            '\u2618️ *Tιтle : ' +
            _0x126c5d +
            ' ' +
            _0x1c4278 +
            '*' +
            '\n' +
            '\n' +
            ('\uD83D\uDCC6 *Rᴇʟᴇᴀꜱᴇ \u27A0 ' + _0x308bcf + '*') +
            '\n' +
            ('\uD83C\uDF1F *Rᴀᴛɪɴɢ \u27A0 ' + _0x21b7f9 + '*') +
            '\n' +
            ('\u23F0 *Rᴜɴᴛɪᴍᴇ \u27A0 ' + _0x509a1c + '*') +
            '\n' +
            ('\uD83C\uDF41 *Lᴀɴɢᴜᴀɢᴇꜱ \u27A0 ' + _0x59275d + '*') +
            '\n' +
            ('\uD83C\uDFA5 *Dɪʀᴇᴄᴛᴏʀ \u27A0 ' + _0x5c698c + '*') +
            '\n' +
            ('\uD83D\uDCD5 *Gᴇɴʀᴇs \u27A0 ' + _0x53cbcb + '*') +
            '\n' +
            ('\uD83C\uDF0E *Cᴏᴜɴᴛʀʏ \u27A0 ' + _0x30b146 + '*') +
            '\n' +
            ('\uD83D\uDC83 *Cᴀꜱᴛ \u27A0 ' + _0x134817 + '*') +
            '\n' +
            '\n' +
            ('\uD83D\uDCD6 *' + _0x4c8459 + '*') +
            '\n' +
            '\n' +
            '> *Mᴀꜱᴛᴇʀ-X-Cyʙᴇʀ\u2122*'
          if (_0x1387ea?.length === 1 && _0x1387ea[0] === _0x3baf07) {
            const _0xc1f7c1 = { url: _0x1dc1bb }
            const _0x41c2b8 = {
              image: _0xc1f7c1,
              caption: _0x162bb9,
            }
            const _0x2fce8c = { quoted: _0x4799b3 }
            const _0x1fce0f = await _0x2fa564.sendMessage(
                _0x3baf07,
                _0x41c2b8,
                _0x2fce8c
              ),
              _0x5cae7f = {
                text: '\uD83D\uDCFD️',
                key: _0x1fce0f.key,
              }
            const _0x19f58f = { react: _0x5cae7f }
            await _0x2fa564.sendMessage(_0x3baf07, _0x19f58f)
          } else {
            await Promise.all(
              _0x1387ea.map(async (_0x50fd03) => {
                const _0x14db32 = { url: _0x1dc1bb }
                const _0x1af783 = {
                  image: _0x14db32,
                  caption: _0x162bb9,
                }
                const _0x383698 = await _0x2fa564.sendMessage(
                    _0x50fd03,
                    _0x1af783
                  ),
                  _0x285a73 = {
                    text: '\uD83D\uDCFD️',
                    key: _0x383698.key,
                  }
                const _0x137eb2 = { react: _0x285a73 }
                await _0x2fa564.sendMessage(_0x50fd03, _0x137eb2)
              })
            )
          }
        } else {
          const _0x304e3e = await fetchJson(
            'https://omdbapi.com/?apikey=742b2d09&s=' + _0x252c70 + '&plot=full'
          )
          let _0x1b9988 = [],
            _0x578c1c =
              '*IMDB MOVIE*\n\n' +
              ('Your search : ' + _0x252c70) +
              '\n' +
              'please reply the number you want..' +
              '\n' +
              '===================' +
              '\n'
          const _0xbdaa1 = _0x304e3e.Search.slice(0, 10)
          _0xbdaa1.forEach((_0x1f0ba0, _0x3f4925) => {
            _0x578c1c +=
              formatNumber(_0x3f4925 + 1) +
              ' *' +
              _0x1f0ba0.Title +
              ' - ' +
              _0x1f0ba0.Year +
              '* (' +
              _0x1f0ba0.Type +
              ')\n'
            _0x1b9988.push('.imdb id=' + _0x1f0ba0.imdbID + ' ' + _0x4b8347)
          })
          const _0x5c9ebe = { text: _0x578c1c }
          const _0x412452 = { quoted: _0x4799b3 }
          const _0x3a3383 = await _0x2fa564.sendMessage(
              _0x38e7e4,
              _0x5c9ebe,
              _0x412452
            ),
            _0x4dc8c2 = {
              key: _0x3a3383.key,
              numrep: _0x1b9988,
              method: 'nondecimal',
            }
          const _0x201646 = _0x4dc8c2
          await storenumrepdata(_0x201646)
          const _0x313131 = {
            text: '\uD83D\uDCDC',
            key: _0x3a3383.key,
          }
          const _0xa45e5d = { react: _0x313131 }
          await _0x2fa564.sendMessage(_0x38e7e4, _0xa45e5d)
        }
      }
    } catch (_0x4757d3) {
      console.log(_0x4757d3)
    }
  }
)
const _0x271ba1 = {}
_0x271ba1.pattern = 'gdrive'
_0x271ba1.alias = ["googledrive'"]
_0x271ba1.react = '\uD83D\uDCD1'
_0x271ba1.desc = 'Download googledrive files.'
_0x271ba1.category = 'movie'
_0x271ba1.use = '.gdrive <googledrive link>'
_0x271ba1.filename = __filename
cmd(
  _0x271ba1,
  async (
    _0xbda607,
    _0x3ff7ad,
    _0x228b38,
    {
      from: _0xc292fd,
      l: _0xfc71e,
      quoted: _0x3ab7e8,
      body: _0x578a72,
      isCmd: _0x57094f,
      command: _0x53f6c9,
      args: _0xa2b25a,
      q: _0x1e205f,
      isGroup: _0x11c05a,
      sender: _0x21f0b6,
      senderNumber: _0x20bf30,
      botNumber2: _0x5ee962,
      botNumber: _0x54a092,
      pushname: _0x23023c,
      isMe: _0x5a81e8,
      isOwner: _0x5e8ad8,
      groupMetadata: _0x5ef6b5,
      groupName: _0x321400,
      participants: _0x11c46f,
      isItzcp: _0x5db157,
      groupAdmins: _0x463b9c,
      isBotAdmins: _0x35c277,
      isAdmins: _0xa2628c,
      reply: _0x531e4c,
      react: _0x1ef5b1,
    }
  ) => {
    try {
      let _0x33472b = _0xc292fd,
        _0x1743fe = [],
        _0x6c10e2,
        _0x29c374
      if (_0x11c05a) {
        const _0x51d9e4 = await fetchJson(
          config.DOWNLOADSAPI +
            '/' +
            _0xc292fd +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        if (
          _0x51d9e4 &&
          (_0x51d9e4?.error || _0x51d9e4?.data?.type == 'false')
        ) {
          return
        }
        _0x1743fe.push(_0x228b38.chat)
        _0x6c10e2 = _0x1e205f
        _0x29c374 = false
      } else {
        if (!_0x11c05a) {
          const _0x12f077 = await fetchJson(
            config.DOWNLOADSAPI +
              '/' +
              _0x21f0b6 +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (
            _0x12f077 &&
            (_0x12f077?.error || _0x12f077?.data?.type == 'false')
          ) {
            return
          }
          const _0x15f4d0 = await parseInput(_0x1e205f, _0x228b38.chat)
          _0x6c10e2 = _0x15f4d0.input
          _0x1743fe = _0x15f4d0.chat
          _0x29c374 = _0x15f4d0.me
        }
      }
      if (_0x6c10e2) {
        let _0xb8838 = await fg.GDriveDl(_0x6c10e2)
        const _0x4b408f = { quoted: _0x3ff7ad }
        if (_0xb8838.fileSizeB / 1024 >= config.MAX_SIZE) {
          return await _0xbda607.sendMessage(
            _0xc292fd,
            { text: '\u274C *This file has exceeded the download limit.*' },
            _0x4b408f
          )
        }
        await _0x531e4c(
          '*\uD83D\uDCC3 File name:*  ' +
            _0xb8838.fileName +
            '\n' +
            ('*\uD83D\uDC88 File Size:* ' + _0xb8838.fileSize) +
            '\n' +
            ('*\uD83D\uDD79️ File type:* ' + _0xb8838.mimetype)
        )
        if (_0x1743fe?.length === 1 && _0x1743fe[0] === _0x33472b) {
          const _0x41929e = { url: _0xb8838.downloadUrl }
          const _0x34a2ea = {
            document: _0x41929e,
            fileName: _0xb8838.fileName,
            mimetype: _0xb8838.mimetype,
          }
          const _0x30f06d = { quoted: _0x3ff7ad }
          const _0x4d6b8d = await _0xbda607.sendMessage(
              _0x33472b,
              _0x34a2ea,
              _0x30f06d
            ),
            _0x105eed = {
              text: '\uD83D\uDCD1',
              key: _0x4d6b8d.key,
            }
          const _0x14d6e4 = { react: _0x105eed }
          await _0xbda607.sendMessage(_0x33472b, _0x14d6e4)
        } else {
          await Promise.all(
            _0x1743fe.map(async (_0x4e9585) => {
              const _0x11b960 = { url: _0xb8838.downloadUrl }
              const _0x2f5907 = {
                document: _0x11b960,
                fileName: _0xb8838.fileName,
                mimetype: _0xb8838.mimetype,
              }
              const _0x377891 = await _0xbda607.sendMessage(
                  _0x4e9585,
                  _0x2f5907
                ),
                _0x92e957 = {
                  text: '\uD83D\uDCD1',
                  key: _0x377891.key,
                }
              const _0x3cbd03 = { react: _0x92e957 }
              await _0xbda607.sendMessage(_0x4e9585, _0x3cbd03)
            })
          )
        }
      }
    } catch (_0xd395bf) {
      console.log(_0xd395bf)
    }
  }
)
const _0x1e806c = {}
_0x1e806c.alias = ['allepies']
_0x1e806c.react = '\uD83D\uDCD1'
_0x1e806c.desc = 'Download all episodes.'
_0x1e806c.category = 'movie'
_0x1e806c.use = '.allepies <episode link>'
_0x1e806c.filename = __filename
cmd(
  _0x1e806c,
  async (
    _0x305e8e,
    _0x371fcb,
    _0x2df100,
    {
      from: _0x5a70ef,
      l: _0x1d40fa,
      quoted: _0x36b70c,
      body: _0x406825,
      isCmd: _0x5089f6,
      command: _0x5495c9,
      args: _0x33fd74,
      q: _0x58e9b7,
      isGroup: _0x12c65f,
      sender: _0x4ca338,
      senderNumber: _0x125e35,
      botNumber2: _0x54f1ce,
      botNumber: _0x10d185,
      pushname: _0x3b4795,
      isMe: _0x3a61a0,
      isOwner: _0x36324b,
      groupMetadata: _0x530ee3,
      groupName: _0x1fe677,
      participants: _0x3aeef8,
      isItzcp: _0x256364,
      groupAdmins: _0x38da2f,
      isBotAdmins: _0x193702,
      isAdmins: _0x443118,
      reply: _0x35b2c7,
      react: _0x5dcc52,
    }
  ) => {
    try {
      let _0x106762 = _0x5a70ef,
        _0x5733c7 = [],
        _0x541537,
        _0x427604
      if (_0x12c65f) {
        const _0x272d03 = await fetchJson(
          config.DOWNLOADSAPI +
            '/' +
            _0x5a70ef +
            '?' +
            sinsub.apikey +
            config.DEVAPIKEY
        )
        if (
          _0x272d03 &&
          (_0x272d03?.error || _0x272d03?.data?.type == 'false')
        ) {
          return
        }
        _0x5733c7.push(_0x2df100.chat)
        _0x541537 = _0x58e9b7
        _0x427604 = false
      } else {
        if (!_0x12c65f) {
          const _0x287858 = await fetchJson(
            config.DOWNLOADSAPI +
              '/' +
              _0x4ca338 +
              '?' +
              sinsub.apikey +
              config.DEVAPIKEY
          )
          if (
            _0x287858 &&
            (_0x287858?.error || _0x287858?.data?.type == 'false')
          ) {
            return
          }
          const _0x23af16 = await parseInput(_0x58e9b7, _0x2df100.chat)
          _0x541537 = _0x23af16.input
          _0x5733c7 = _0x23af16.chat
          _0x427604 = _0x23af16.me
        }
      }
      _0x541537 && (await _0x35b2c7('This feature will shortly be added.!!'))
    } catch (_0x7e5b7a) {
      console.log(_0x7e5b7a)
    }
  }
)
