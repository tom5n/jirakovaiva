import React, { useEffect, useState } from "react";
import { Instagram as InstagramIcon } from "lucide-react";
import { supabase } from "../lib/supabase";

const Instagram = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('instagram_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="instagram" className="section-padding bg-[#F3E8E2]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto reveal inline-block text-[#21435F]">
            Sledujte mě na Instagramu
          </h2>
        </div>
        {loading ? (
          <div className="text-center text-lg text-[#21435F]">Načítání...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded-lg reveal group"
              >
                <img
                  src={post.image_url}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <InstagramIcon size={24} className="text-white" />
                </div>
              </a>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/ivana_farmasi/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-colors duration-300 px-8 py-4 text-lg rounded-full group"
          >
            Sledovat na Instagramu
            <InstagramIcon size={18} className="ml-2 transition-transform duration-300 group-hover:rotate-12" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Instagram; 