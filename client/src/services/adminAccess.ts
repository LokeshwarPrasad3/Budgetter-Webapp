import { apiURL } from '@/lib/http';
import {
  AppUsersResType,
  NewsletterResType,
} from '@/types/api/admin/reports/userReports';
import { NewsletterCredType } from '@/types/api/admin/reports/credentials';

// Get all app users
export const GetAppUsersDetails = async () => {
  const { data } = await apiURL.get<AppUsersResType>(`/user/get-all-users`);
  return data;
};

// Send newsletter to all users
export const SendNewsletter = async (credentials: NewsletterCredType) => {
  const { data } = await apiURL.post<NewsletterResType>(
    `/user/send-newsletter`,
    credentials
  );
  return data;
};
