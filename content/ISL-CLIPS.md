# Recording the ISL dictionary clips

Forty terms, forty short clips. This is the brief to hand to whoever films
them, and the checklist for getting them into the site afterwards.

Ten of the forty are the digits 0–9, added because a child cannot sign a real
amount - ₹500, an ATM PIN, an OTP - from words alone, and until now the
dictionary had no number in it at all. Numbers with more than one digit are
signed one digit at a time, so these ten sit behind every rupee figure
elsewhere in this document, not apart from it.

Nothing in the code is waiting on a decision - drop the files in and run one
command. The site already shows a labelled "ISL clip - coming soon" panel in
the exact place each clip will sit, so nothing moves on the page when they
arrive.

## Permission on file

> **Fill this in.** The credit line under every clip currently reads
> "Sign videos from Spread the Sign, © European Sign Language Centre. Used with
> permission." That claim needs a record behind it, and this is the only place
> anyone will look for one.
>
> - **Granted by:** _name and email at the European Sign Language Centre_
> - **Date:** _when_
> - **Covers:** _which clips, and what use - this site only, or wider?_
> - **Conditions:** _attribution wording they asked for, if any_
> - **Where the message is kept:** _who has the email_
>
> If they specified different credit wording, put theirs in
> `signVideoCredit.text` in `dictionary.json` rather than leaving mine.

## Three ways to get the clips

**Source them from Spread the Sign** (permission now granted - see above),
**source them from the ISLRTC dictionary**, or **film them**. Most projects end
up doing more than one, because no single collection covers all forty of these
words.

### Sourcing from Spread the Sign

Look each term up in the Indian Sign Language section, check the sign is the one
your community uses, save the video, rename it to the file name in the shot
list, and drop it in `public/sign/`.

To get a link for every term still missing:

```bash
npm run sign:links
```

Two things to hold to:

- **Save the file, do not hotlink.** Pointing `<video src>` at their server
  would make every visitor's browser call a third party, which contradicts the
  privacy promise on `/accessibility` - and a permission to use clips is not
  normally a permission to draw on someone's bandwidth.
- **Keep within what they granted.** If the permission covers this site, it
  covers this site. Re-using the clips in a printed workbook, an app, or another
  organisation's material is a fresh conversation with them.

If some clips come from Spread the Sign and others from ISLRTC or your own
filming, set `credit` on those individual entries - see
[Crediting a clip](#crediting-a-clip). Mixed sources are normal; a wrong credit
is not.

### Sourcing from ISLRTC (the fallback for gaps)

The [Indian Sign Language Research and Training Centre](https://islrtc.nic.in/)
(Government of India) publishes a 10,000-term ISL dictionary, distributed
through YouTube, Google Drive and the DIKSHA portal. Its
[FAQ](https://islrtc.nic.in/faq/) (Q.23) allows the dictionary to be used for
research, teaching and ISL-related technology, on two conditions:

1. it is **not resold or used for profit**, and
2. **ISLRTC is acknowledged**.

This site is free and non-commercial, so it fits. The acknowledgement is already
wired up: `signVideoCredit` in `dictionary.json` prints a credit line under
every clip that does not carry its own. Leave it in place if you use their
clips. Confirm the current terms yourself before a batch - a licence read off a
FAQ in 2026 is not a contract, and writing to ISLRTC for confirmation costs one
email.

Download the clips you need, rename them to the file names in the shot list,
trim to the single sign, and put them in `public/sign/` like any other clip.
Self-hosting matters here: linking straight to YouTube would make the page fetch
video from a third party, which contradicts the privacy promise on
`/accessibility`. If you decide to embed instead, that page has to be reworded.

**Expect gaps.** The ISLRTC dictionary is strongest on academic, legal and
everyday vocabulary. Several terms in this list are recent or specific enough
that they may have no entry - `upi`, `otp`, `pin`, `phishing`, `scam`,
`compound-interest`, `savings-goal`. Those will need filming, or the everyday
fingerspelled form the local Deaf community actually uses.

**Research datasets do not help here.** The INCLUDE dataset is the only large
ISL corpus under a clean CC BY 4.0 licence, but its 263 signs are animals,
colours, clothes, greetings and transport - no finance vocabulary at all. The
others (FDMSE-ISL, ISL-CSLTR, ISLTranslate) are gesture-recognition corpora:
multi-angle, multi-signer, built for training models rather than for showing one
clear sign to a child, and mostly available on request rather than openly.

### Filming your own

Everything below is the brief for that.

## Who should sign

A **Deaf ISL signer**, and ideally the same person for all forty, so the
signing space, rhythm and framing stay consistent across the dictionary.

This matters more than it might look. ISL varies by region and school, and
finance vocabulary varies most of all - several of these terms (UPI, OTP,
compound interest) have no long-settled sign and are commonly fingerspelled or
signed with a local convention. A hearing signer working from a word list will
usually produce something a Deaf child finds stiff or wrong.

Before the session, agree each sign with the school's Deaf ISL teacher, and
check it against the **ISLRTC** dictionary (Indian Sign Language Research and
Training Centre, New Delhi), which is the closest thing to a national reference.
Use it to *verify* signs - do not copy their video files into this site without
checking their reuse terms first.

Get a written release from the signer covering use on this site, and credit them
by name on the `/accessibility` page. Their face is in every clip.

## How to film

**Framing.** Head to just below the waist, centred, with room either side -
signing space is wider than the body. Nothing may leave the frame, ever, at any
point in the sign. Square (1:1) matches how the page displays it.

**Face in shot, always.** Grammar in sign language lives in the eyebrows, mouth
and head tilt as much as the hands. Never crop the face, never film from above.

**Background.** Plain, matte, and mid-tone - no patterns, no bookshelves, no
windows behind. It must contrast with both skin tone and clothing.

**Clothing.** Plain, long-sleeved, contrasting with skin tone. No logos, no
stripes, no busy prints. Remove shiny jewellery, watches and bright nail polish;
they pull the eye off the handshape.

**Lighting.** Even and from the front. No backlight, no hard shadow across the
hands or face.

**Performance.** Sign at a natural, unhurried pace - not slowed down, which
distorts the sign. Sign it **twice** with a short rest between, hands starting
and ending at rest. Begin and end each clip on a still frame with hands down,
so a looping clip does not jump.

**Sound.** None needed. If the camera records audio anyway, strip it - the page
mutes playback regardless.

## Files

| Setting | Value |
| --- | --- |
| Format | MP4, H.264 |
| Frame | 1080 × 1080 (square), 30 fps |
| Length | about 4–8 seconds, both repetitions included |
| Size | under ~2 MB each - these load on school devices |
| Audio | none |
| Name | exactly the file name in the table below, lowercase, `.mp4` |

Put them all in `public/sign/`. `.webm` and `.mov` also work if that is what
comes off the camera.

## Getting them into the site

```bash
npm run sign:sync
```

That scans `public/sign/`, updates `content/sign-clips.json`, and prints how
many of the forty are in place along with anything still missing. It also names
any file that does not match a term, which is nearly always a typo in a file
name. Re-run it after every batch - no other step, and no JSON to edit by hand.

To check without writing anything (useful in CI):

```bash
npm run sign:check
```

A clip does not have to wait for the other thirty-nine. Each one goes live on
its own as soon as it is synced.

## The shot list

The last column is what the sign has to *mean*, not a script to be signed word
for word. Where a term is an English initialism the site expects the everyday
signed form, fingerspelled if that is what people actually use.

| File name | Term | Group | Meaning to sign |
| --- | --- | --- | --- |
| money | **Money** | Money basics | What people use to buy things. In India we use rupees. |
| rupee | **Rupee** | Money basics | The money used in India. Its sign is ₹. |
| coin | **Coin** | Money basics | Money made of metal. It is round and small. |
| note | **Note** | Money basics | Money made of paper. |
| price | **Price** | Money basics | How much money a thing costs. |
| spend | **Spend** | Money basics | To use money to buy something. |
| save | **Save** | Money basics | To keep money now so you can use it later. |
| need | **Need** | Planning | Something you must have to stay well, like food or a home. |
| want | **Want** | Planning | Something nice to have, but you can live without it. |
| budget | **Budget** | Planning | A written plan for your money. It shows money in and money out. |
| income | **Income** | Planning | Money that comes to you, usually from work. |
| expense | **Expense** | Planning | Money that goes out when you buy something. |
| savings-goal | **Savings goal** | Planning | A thing you are saving for, with a price and a date. |
| bank | **Bank** | Banking | A safe place that keeps your money and records how much is yours. |
| account | **Account** | Banking | Your own record at a bank. It shows the money that belongs to you. |
| deposit | **Deposit** | Banking | Putting money into your bank account. |
| withdrawal | **Withdrawal** | Banking | Taking money out of your bank account. |
| balance | **Balance** | Banking | The amount of money in your account right now. |
| atm | **ATM** | Banking | A machine that gives you cash from your account. You need a card and a PIN. |
| interest | **Interest** | Banking | Extra money. A bank pays you interest on savings. You pay interest when you borrow. |
| compound-interest | **Compound interest** | Banking | Interest paid on your money and on the interest you already earned. |
| salary | **Salary** | Planning | A fixed amount of money paid for work, every month. |
| profit | **Profit** | Planning | The money left after you take costs away from sales. |
| tax | **Tax** | Planning | Money paid to the government. It pays for roads, hospitals and schools. |
| pin | **PIN** | Safety | A secret number that proves a card or account is yours. Never share it. |
| otp | **OTP** | Safety | A one time password sent to your phone. A real bank will never ask you for it. |
| scam | **Scam** | Safety | A trick used to take your money. |
| phishing | **Phishing** | Safety | A fake message that copies a real company to steal your details. |
| upi | **UPI** | Safety | A way to send money from a phone in India. You enter a PIN only to send money. |
| inflation | **Inflation** | Money basics | Prices slowly going up over time. Each rupee buys a little less. |
| number-0 | **0** | Money basics | The digit zero. |
| number-1 | **1** | Money basics | The digit one. |
| number-2 | **2** | Money basics | The digit two. |
| number-3 | **3** | Money basics | The digit three. |
| number-4 | **4** | Money basics | The digit four. |
| number-5 | **5** | Money basics | The digit five. |
| number-6 | **6** | Money basics | The digit six. |
| number-7 | **7** | Money basics | The digit seven. |
| number-8 | **8** | Money basics | The digit eight. |
| number-9 | **9** | Money basics | The digit nine. |

Three of the ten digits need a second look before filming: `number-0`
(Spread the Sign lists "zero" as a plain noun, not tagged as a numeral like the
other nine - it may not be the digit) and `number-7` and `number-9` (an entry
exists on Spread the Sign for both, but neither carries an Indian Sign Language
video to check against - see `sign-sources.json`). Confirm all three with the
school's Deaf ISL teacher rather than assuming.

## Crediting a clip

Every clip shows the credit line from `signVideoCredit` in `dictionary.json`
unless it carries its own. To credit one clip differently - a signer who filmed
only that word, say - put it on the entry:

```json
"signVideo": {
  "src": null,
  "language": "isl",
  "credit": { "text": "Signed by <name>", "href": null }
}
```

If you film everything yourself and need no attribution at all, set
`signVideoCredit.appliesToUnattributed` to `false` and the line disappears.

## A clip that lives somewhere else

If one clip has a different name or sits outside `public/sign/`, set its path
explicitly in `content/dictionary.json` and it wins over the folder:

```json
"signVideo": { "src": "/sign/archive/money-v2.mp4", "language": "isl" }
```

You can add a `"poster"` there too, for the still frame shown before play.

## The lesson interpreter clips

Separate job, not covered here. Each lesson in `content/modules/` has a
`video.signInterpreter.src` for a full-lesson interpreter track. Those are long
clips of the whole lesson, not single words, so they are filmed differently -
see the README.
