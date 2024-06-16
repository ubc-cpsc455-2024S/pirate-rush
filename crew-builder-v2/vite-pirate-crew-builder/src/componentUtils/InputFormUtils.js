const DEFAULT_DESCRIPTION = "A powerful pirate and a dear friend";

export function createImage(name) {
  switch (name.toLowerCase()) {
    case "luffy":
      return [
        "https://optc-db.github.io/api/images/full/transparent/0/000/0002.png",
        "https://optc-db.github.io/api/images/full/transparent/2/000/2073.png",
        "https://optc-db.github.io/api/images/full/transparent/2/300/2363.png",
      ];
    case "zoro":
      return [
        "https://optc-db.github.io/api/images/full/transparent/0/000/0005.png",
        "https://optc-db.github.io/api/images/full/transparent/2/400/2476.png",
        "https://optc-db.github.io/api/images/full/transparent/3/200/3202.png",
      ];
    case "nami":
      return [
        "https://optc-db.github.io/api/images/full/transparent/0/000/0009.png",
        "https://optc-db.github.io/api/images/full/transparent/2/000/2073.png",
        "https://optc-db.github.io/api/images/full/transparent/2/300/2363.png",
      ];
    case "usopp":
      return [
        "https://optc-db.github.io/api/images/full/transparent/0/000/0013.png",
        "https://optc-db.github.io/api/images/full/transparent/1/500/1531.png",
        "https://optc-db.github.io/api/images/full/transparent/1/500/1543.png",
      ];
    case "sanji":
      return [
        "https://optc-db.github.io/api/images/full/transparent/0/000/0017.png",
        "https://optc-db.github.io/api/images/full/transparent/1/500/1587.png",
        "https://optc-db.github.io/api/images/full/transparent/1/500/1588.png",
      ];
    case "robin":
      return [
        "https://optc-db.github.io/api/images/full/transparent/0/200/0209.png",
        "https://optc-db.github.io/api/images/full/transparent/1/900/1950.png",
        "https://optc-db.github.io/api/images/full/transparent/2/800/2830.png",
      ];
    default:
      return [
        "https://optc-db.github.io/api/images/full/transparent/3/600/3682.png",
        "https://optc-db.github.io/api/images/full/transparent/3/500/3514.png",
        "https://optc-db.github.io/api/images/full/transparent/3/500/3515.png",
      ];
  }
}

export function setMemberImages(imageURL, name) {
  if (imageURL.trim() !== "") {
    return [
      imageURL,
      "https://optc-db.github.io/api/images/full/transparent/3/500/3514.png",
      "https://optc-db.github.io/api/images/full/transparent/3/500/3515.png"
    ];
  } else {
    return createImage(name);
  }
}

export function setMemberImgVersion(imageVersion) {
  if (imageVersion !== null) {
    return imageVersion - 1;
  } else {
    return 0;
  }
}

export function setMemberDescription(description) {
  if (description.trim() !== "") {
    return description;
  } else {
    return DEFAULT_DESCRIPTION;
  }
}