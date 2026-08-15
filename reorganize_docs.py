from pathlib import Path
import re

root = Path(__file__).parent
docs = root / "docs"
source_path = docs / "index.md"
source = source_path.read_text(encoding="utf-8")

modifications = [
    ("Break", "break.md"),
    ("Emphasis", "emphasis.md"),
    ("Echo", "echo.md"),
    ("Expletive/Beep", "expletive-beep.md"),
    ("IPA (International Phonetic Alphabet)", "ipa.md"),
    ("Language", "language.md"),
    ("Megaphone", "megaphone.md"),
    ("Max Duration", "max-duration.md"),
    ("Minified", "minified.md"),
    ("Muffler", "muffler.md"),
    ("Pitch", "pitch.md"),
    ("Soft", "soft.md"),
    ("Rate", "rate.md"),
    ("Reverb", "reverb.md"),
    ("Robot", "robot.md"),
    ("Timbre", "timbre.md"),
    ("Volume", "volume.md"),
    ("Whisper", "whisper.md"),
]

special_effects = [
    ("Breath", "breath.md"),
    ("Tones", "tones.md"),
]


def section(title: str, next_heading_pattern: str) -> str:
    pattern = (
        rf"^### _{re.escape(title)}_\r?\n"
        rf"(.*?)(?=^{next_heading_pattern}|\Z)"
    )
    match = re.search(pattern, source, flags=re.MULTILINE | re.DOTALL)
    if not match:
        raise RuntimeError(f"Could not locate section: {title}")
    body = f"### _{title}_\n{match.group(1)}"
    return body.rstrip() + "\n"


mods_dir = docs / "modifications"
effects_dir = docs / "special-effects"
mods_dir.mkdir(parents=True, exist_ok=True)
effects_dir.mkdir(parents=True, exist_ok=True)

(mods_dir / "index.md").write_text(
    """---
layout: default
title: Modifications
nav_order: 2
has_children: true
---

# Modifications

These pages describe the shorthand voice modifications, their supported values, and examples.
""",
    encoding="utf-8",
)

for order, (title, filename) in enumerate(modifications, start=1):
    content = section(title, r"### |## ")
    (mods_dir / filename).write_text(
        f"""---
layout: default
title: {title}
parent: Modifications
nav_order: {order}
---

{content}""",
        encoding="utf-8",
    )

special_intro_match = re.search(
    r"^## Special Effects\r?\n\r?\n(.*?)(?=^---\r?$)",
    source,
    flags=re.MULTILINE | re.DOTALL,
)
if not special_intro_match:
    raise RuntimeError("Could not locate Special Effects intro")
special_intro = special_intro_match.group(1).rstrip()

(effects_dir / "index.md").write_text(
    f"""---
layout: default
title: Special Effects
nav_order: 3
has_children: true
---

# Special Effects

{special_intro}
""",
    encoding="utf-8",
)

for order, (title, filename) in enumerate(special_effects, start=1):
    content = section(title, r"### |## ")
    (effects_dir / filename).write_text(
        f"""---
layout: default
title: {title}
parent: Special Effects
nav_order: {order}
---

{content}""",
        encoding="utf-8",
    )

homepage_match = re.search(
    r"\A(---\r?\n.*?\r?\n---\r?\n)(.*?)(?=^## _Modifications_\r?$)",
    source,
    flags=re.MULTILINE | re.DOTALL,
)
if not homepage_match:
    raise RuntimeError("Could not isolate homepage content")

homepage = homepage_match.group(1) + homepage_match.group(2)
homepage = re.sub(
    r"\r?\n\{% raw %\}.*?\{% endraw %\}\r?\n",
    "\n",
    homepage,
    flags=re.DOTALL,
)
homepage = homepage.replace("## Updates\n", "## Updates\n{: .no_toc }\n", 1)
homepage = re.sub(
    r"\r?\n  - \[_Modifications_\]\(#modifications\)"
    r"\r?\n(?:    - .*){6}",
    "",
    homepage,
)
source_path.write_text(homepage.rstrip() + "\n", encoding="utf-8")

audio_path = docs / "examples" / "audio.md"
audio = audio_path.read_text(encoding="utf-8")
audio = re.sub(r"^nav_order:\s*\d+\s*$", "nav_order: 4", audio, flags=re.MULTILINE)
audio_path.write_text(audio, encoding="utf-8")
