import { Carousel } from '@/components/carousel';
import { useRouter } from 'next/navigation';

export const Team = () => {
    const teamMembers = [
        {
            name: "Maicol Arroyave",
            role: "CEO & Fundador",
            linkedin: "https://www.linkedin.com/in/maicolaa/",
            image: "/files/photos/F001.jpeg"
        },
        {
            name: "Oscar David Ramos Calzada",
            role: "Director de Tecnología",
            linkedin: "https://www.linkedin.com/in/david-ramos-calzada-5b486b36b/",
            image: "https://media.licdn.com/dms/image/v2/D4E03AQEtMte4VZW9mQ/profile-displayphoto-shrink_200_200/B4EZd0mg7aH0Ac-/0/1750007943433?e=1761177600&v=beta&t=UVOzE7HC7vX3PI5CPpvXzB3IQm6aPM65H7SJC53GVsI"
        },
        {
            name: "Johan Esteban Moreno Jimenez",
            role: "Líder de Desarrollo",
            linkedin: "https://www.linkedin.com/in/johan-esteban-moreno-jim%C3%A9nez-71051b265",
            image: "https://media.licdn.com/dms/image/v2/D4E35AQFuQFCmB8aIkw/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1685220765181?e=1759068000&v=beta&t=aRrA3ln-cJRlySww5_b9Lwicb999f3BYQv6R9bk7oL4"
        },
    ];

    const redirectTo = (item) => {
        window.open(item.linkedin, "_blank");
    };


    const renderTeamItem = (member) => (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1 h-full" >
            <div className="h-60 overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0B4059]">{member.name}</h3>
                <p className="text-[#0B4059] opacity-80">{member.role}</p>
            </div>
        </div>
    );

    return (
        <Carousel
            id="team"
            items={teamMembers}
            renderItem={renderTeamItem}
            title="Nuestro equipo"
            description="Conoce al talentoso equipo detrás de JDM Consultoría."
            itemsPerPageConfig={{ mobile: 1, tablet: 2, desktop: 3 }}
            backgroundColor="bg-[#E1EDF0]"
            onClickItem={redirectTo}
        />
    );
};