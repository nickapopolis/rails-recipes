resource "digitalocean_volume" "tasteful-recipes-volume" {
  region      = "nyc3"
  name        = "tasteful-recipes-volume"
  size        = 1
  description = "Filestore"
}

resource "digitalocean_droplet" "tasteful-recipes" {
  image = "ubuntu-18-04-x64"
  name = "tasteful-recipes"
  region = "nyc3"
  size = "1gb"
  private_networking = true
  ssh_keys = [
    "${var.ssh_fingerprint}"
  ]
  volume_ids = ["${digitalocean_volume.tasteful-recipes-volume.id}"]

  connection {
    user = "root"
    type = "ssh"
    host = "${self.ipv4_address}"
    private_key = "${file(var.pvt_key)}"
    timeout = "2m"
  }
  provisioner "remote-exec" {
    inline = [
      "export PATH=$PATH:/usr/bin",
      "git clone git@github.com:nickapopolis/rails-recipes.git",
      "sudo apt update",
      "sudo apt install apt-transport-https ca-certificates curl software-properties-common",
      "wget -qO - https://download.docker.com/linux/ubuntu/gpg >> docker.gpg",
      "sudo apt-key add docker.gpg",
      "sudo add-apt-repository \"deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable\"",
      "sudo apt update",
      "sudo apt install docker-ce",
      "sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",
      "cd rails-recipes",
      "docker-compose --build up"
    ]
  }
}