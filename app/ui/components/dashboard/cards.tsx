import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { getTotalUsers } from "@/app/services/users/UserApi";
import { getTotalBlogs } from "@/app/services/blogs/BlogApi";
import { getTotalComments } from '@/app/services/comment/CommentApi';

const iconMap = {
  views: ChartBarIcon,
  users: UserGroupIcon,
  comments: ChatBubbleLeftRightIcon,
  blogs: DocumentTextIcon,
};

export default async function CardWrapper() {
  const {
    numberOfBlogs,
    numberOfUsers,
    totalVisits,
    totalComments,
  } = {
    numberOfBlogs: await getTotalBlogs(),
    numberOfUsers: await getTotalUsers(),
    totalVisits: 10000,
    totalComments: await getTotalComments(),
  };

  return (
    <>
      <Card title="Visitas" value={totalVisits} type="views" />
      <Card title="Comentarios" value={totalComments} type="comments" />
      <Card title="Blogs" value={numberOfBlogs} type="blogs" />
      <Card
        title="Usuarios"
        value={numberOfUsers}
        type="users"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'blogs' | 'users' | 'comments' | 'views';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
