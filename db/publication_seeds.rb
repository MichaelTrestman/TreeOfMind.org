trestman_to_z_pubs = [

  {
    title: "",
    publication_date: "",
    authors: [],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },

  {
    title: "The Cambrian explosion and the origins of embodied cognition.",
    publication_date: "2013",
    authors: ["Trestman, Michael"],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: ["vertebrates", "cephalodopods", "arthropods"],
    referenced_taxa: []
  },

  {
    title: "The biological basis of speech: What to infer from talking to the animals.",
    publication_date: "2001",
    authors: ["Trout, J.D."],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },

  {
    title: "Memory and consciousness.",
    publication_date: "1985",
    authors: ["Tulving, E."],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },

  {
    title: "Consciousness, Color, and Content.",
    publication_date: "2000",
    authors: ["Tye, M."],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },
  {
    title: "In Nature's Interests?",
    publication_date: "1998",
    authors: ["Varner, G."],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },
  {
    title: "Personhood, Ethics, and Animal Cognition: Situating Animals in Hare's Two Level Utilitarianism",
    publication_date: "2012",
    authors: ["Varner, G."],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },
  {
    title: "The evolution of consciousness.",
    publication_date: "2013",
    authors: ["Velmans, M."],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },
  {
    title: "The philosophy of bird's nests.",
    publication_date: "1867",
    authors: ["Wallace, A.R."],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },
  {
    title: "Comparative and Evolutionary Aspects of Nociceptor Function.",
    publication_date: "1996",
    authors: ["Walters, E.T."],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },

  {
    title: "The Ways of Behaviorism",
    publication_date: "1928",
    authors: ["Watson, J.B."],
    abstract: "",
    link_urls: [],
    proposed_origin_taxa: []
  },

]

def log_pubs pubs
  pubs.each do |pub|
    if Publication.where({title: pub[:title]}).count > 0
      db_pub = Publication.where({title: pub[:title]})[0]
    else
      db_pub = Publication.create({
        title: pub[:title],
        publication_date: pub[:publication_date]
      })
    end

    pub[:authors].each do |auth|
      this_author = {}
      this_author[:name] = auth.split(',')
      this_author[:last_name] = this_author[:name][0]
      this_author[:first_name] = this_author[:name][1]

      # db_auth = Researcher.where({
      #   first_name: this_author.first_name,
      #   last_name: this_author.last_name
      # })[0]

      if db_pub.authors.any?{ |db_auth|
        this_author[:first_name] + this_author[:last_name] == db_auth.first_name + db_auth.last_name
      }
        {message: 'author previously in list'}
      elsif Researcher.any?{ |db_auth|
        this_author[:first_name] + this_author[:last_name]  == db_auth.first_name + db_auth.last_name
      }
        new_author = Researcher.where({
          first_name: this_author[:first_name],
          last_name: this_author[:last_name]
        })[0]
        db_pub.authors << new_author
        new_author.publications << db_pub
      else
        new_author = Researcher.create({
          first_name: this_author[:first_name],
          last_name: this_author[:last_name]
        })
        db_pub.authors << new_author
        new_author.publications << db_pub
      end
    end
  end
end
log_pubs trestman_to_z_pubs