import {UserImportedContent, UserImportedEnvironment, UserImportedSoftware} from '@/data_access/models/app';
import ICrudServiceResult from '@/services/interfaces/ICrudServiceResult';

export default interface IResourceImportResult {
	userID: number;
	userImportedEnvironments: ICrudServiceResult<UserImportedEnvironment[]>;
	userImportedSoftware: ICrudServiceResult<UserImportedSoftware[]>;
	userImportedContent: ICrudServiceResult<UserImportedContent[]>;
}
